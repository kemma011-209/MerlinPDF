"use client"
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import type { PageLayout } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

type PdfViewerProps = {
  onAddNote?: (text: string) => void
  onFileSelected?: (file: File) => void
  file?: File | null
}

const PdfViewer = ({ onAddNote, onFileSelected, file }: PdfViewerProps) => {
  const pageLayout: PageLayout = {
    buildPageStyles: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#fafafa',
    }),
  }

  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const objectUrlRef = React.useRef<string | null>(null)
  const [pdfUrl, setPdfUrl] = React.useState<string>("/example.pdf")
  const [isDragging, setIsDragging] = React.useState(false)
  const [tooltip, setTooltip] = React.useState<{
    x: number
    y: number
    text: string
    visible: boolean
  }>({ x: 0, y: 0, text: '', visible: false })

  const clearSelectionAndHide = React.useCallback(() => {
    const sel = window.getSelection?.()
    if (sel && sel.removeAllRanges) sel.removeAllRanges()
    setTooltip((t) => ({ ...t, visible: false, text: '' }))
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseUp = () => {
      const selection = window.getSelection?.()
      const text = selection?.toString()?.trim() || ''
      if (!text) {
        setTooltip((t) => ({ ...t, visible: false, text: '' }))
        return
      }
      if (!selection || selection.rangeCount === 0) return
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const x = rect.left - containerRect.left
      const y = rect.top - containerRect.top - 32
      setTooltip({ x, y: y < 0 ? 0 : y, text, visible: true })
    }

    const handleScroll = () => setTooltip((t) => ({ ...t, visible: false }))
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') clearSelectionAndHide() }

    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('scroll', handleScroll, true)
    window.addEventListener('keydown', handleKey)
    return () => {
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('keydown', handleKey)
    }
  }, [clearSelectionAndHide])

  const handleAdd = () => {
    if (!tooltip.text) return
    onAddNote?.(tooltip.text)
    clearSelectionAndHide()
  }

  const setNewPdfFromFile = (file: File) => {
    if (!file || file.type !== 'application/pdf') return
    const url = URL.createObjectURL(file)
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = url
    setPdfUrl(url)
    onFileSelected?.(file)
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setNewPdfFromFile(f)
  }

  React.useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (file) setNewPdfFromFile(file)
  }, [file])

  return (
    <div className='w-full flex justify-center'>
      <div
        ref={containerRef}
        className='relative w-full max-w-[900px] h-auto viewer-no-scroll p-2 sm:p-3'
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false)
          const file = e.dataTransfer?.files?.[0]
          if (file) setNewPdfFromFile(file)
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            pageLayout={pageLayout}
            theme={{
              theme: 'light',
              cssVariables: {
                '--rpv-core__viewer-background-color': '#fafafa',
              },
            }}
          />
        </Worker>

        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30">
            <div className="pointer-events-none w-full h-full border-2 border-dashed border-white/80 rounded-xl"></div>
            <div className="absolute px-3 py-1 rounded-md bg-white text-neutral-800 text-xs shadow">Drop PDF to view</div>
          </div>
        )}

        {tooltip.visible && (
          <div
            style={{ left: tooltip.x, top: tooltip.y }}
            className="absolute z-50 px-2 py-1 rounded-md border shadow-sm bg-white text-neutral-800 text-xs flex items-center gap-2"
          >
            <span className="max-w-[320px] truncate">{tooltip.text}</span>
            <button
              onClick={handleAdd}
              className="h-6 px-2 rounded border text-xs hover:bg-neutral-100"
            >
              Add note
            </button>
            <button
              onClick={clearSelectionAndHide}
              className="h-6 px-2 rounded border text-xs hover:bg-neutral-100"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfViewer


