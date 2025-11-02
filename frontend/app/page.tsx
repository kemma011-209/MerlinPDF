"use client"
import Image from 'next/image'
import React from 'react'
import { Home, Folder, Settings, Sun, Moon, Trash2 } from 'lucide-react'
import dynamic from 'next/dynamic'
const PdfViewer = dynamic(() => import('../components/PdfViewer'), { ssr: false })
import { queryLLM } from '../functions/api_functions'
const ChartComponent = dynamic(() => import('../components/Chart'), { ssr: false })

const page = () => {
  const [isDark, setIsDark] = React.useState(false)
  const iconColorClass = isDark ? 'text-neutral-200' : 'text-neutral-800'
  const iconBaseClass = 'h-5 w-5 stroke-[0.9] transition-colors duration-300'
  const sidebarBorderClass = isDark ? 'border-neutral-800' : 'border-neutral-200'
  const topbarBgClass = isDark ? 'bg-neutral-900' : 'bg-neutral-50'
  const topbarTextClass = isDark ? 'text-neutral-200' : 'text-neutral-700'

  type ChartPayload = { objects: string[]; values: number[]; types: string[] }

  const [boxes, setBoxes] = React.useState<Array<{
    id: number;
    text: string;
    mode: 'note' | 'chart';
    chartPayload?: ChartPayload;
    loading?: boolean;
    error?: string | null;
  }>>([{ id: 0, text: '', mode: 'note', error: null }])
  const [nextId, setNextId] = React.useState(1)
  const inputRefs = React.useRef<Map<number, HTMLTextAreaElement>>(new Map())
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)

  const setInputRef = (id: number) => (el: HTMLTextAreaElement | null) => {
    if (el) {
      inputRefs.current.set(id, el)
      // Auto-size on mount
      requestAnimationFrame(() => {
        el.style.height = 'auto'
        const max = 160
        const nextHeight = Math.min(el.scrollHeight, max)
        el.style.height = `${nextHeight}px`
        el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden'
      })
    } else {
      inputRefs.current.delete(id)
    }
  }

  const handleKeyDown = (index: number, id: number) => (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const newId = nextId
      setBoxes((prev) => {
        const updated = [...prev]
        updated.splice(index + 1, 0, { id: newId, text: '', mode: 'note', error: null })
        return updated
      })
      setNextId((v) => v + 1)
      requestAnimationFrame(() => {
        inputRefs.current.get(newId)?.focus()
      })
    }
  }

  const handleMakeGraphFor = async (id: number) => {
    setBoxes(prev => prev.map(b => (b.id === id ? { ...b, loading: true, error: null } : b)))
    try {
      const box = boxes.find(b => b.id === id)
      if (!box) return
      const raw = await queryLLM(box.text)
      const payload: any = typeof raw === 'string' ? JSON.parse(raw) : raw
      if (!payload || !Array.isArray(payload.objects) || !Array.isArray(payload.values) || !Array.isArray(payload.types)) {
        throw new Error('Unexpected response format from API')
      }
      setBoxes(prev => prev.map(b => (b.id === id ? { ...b, chartPayload: payload, mode: 'chart', loading: false } : b)))
    } catch (e: any) {
      setBoxes(prev => prev.map(b => (b.id === id ? { ...b, loading: false, error: e?.message || 'Failed to build chart' } : b)))
    }
  }

  const toggleToNote = (id: number) =>
    setBoxes(prev => prev.map(b => (b.id === id ? { ...b, mode: 'note' } : b)))

  const toggleToChart = (id: number) =>
    setBoxes(prev => prev.map(b => (b.id === id && b.chartPayload ? { ...b, mode: 'chart' } : b)))

  const deleteNote = (id: number) => {
    setBoxes(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div id='app-shell' className={`w-full h-screen flex transition-colors duration-300 ${isDark ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <aside className={`w-8 flex flex-col items-center py-2 border-r ${sidebarBorderClass} transition-colors duration-300 sticky top-0 h-screen shrink-0`}>
        <Image
          src="/MerlinLogo.svg"
          alt="logo"
          width={20}
          height={20}
          className={`h-5 w-5 cursor-pointer transition-[filter] duration-300 ${isDark ? 'invert' : ''}`}
        />
        <div className='mt-3 flex flex-col items-center gap-2'>
          <button className='p-0' aria-label="Home">
            <Home className={`${iconBaseClass} ${iconColorClass}`} />
          </button>
          <button className='p-0' aria-label="Folder">
            <Folder className={`${iconBaseClass} ${iconColorClass}`} />
          </button>
          <button className='p-0' aria-label="Settings">
            <Settings className={`${iconBaseClass} ${iconColorClass}`} />
          </button>
          <button
            className='p-0'
            aria-label="Toggle theme"
            onClick={() => setIsDark((v) => !v)}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className={`${iconBaseClass} ${iconColorClass}`} />
            ) : (
              <Moon className={`${iconBaseClass} ${iconColorClass}`} />
            )}
          </button>
        </div>
      </aside>
      <main className='flex-1 h-screen   flex flex-col overflow-hidden'>
        <div className='flex-1 w-full flex px-2 gap-2 overflow-hidden'>
          <div className='w-1/3 h-full flex flex-col pr-1'>
            <div className={`h-8 w-full ${topbarBgClass} ${topbarTextClass} shrink-0 flex items-center px-2 text-sm`}></div>
            <div className='flex-1 overflow-y-auto no-scrollbar pt-4'>
              {boxes.map((box, index) => (
                <div
                  key={box.id}
                  className={`mb-2 rounded-md border px-2 py-1 transition-colors duration-200 ${
                    isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
                  }`}
                >
                  {box.mode === 'note' ? (
                    <>
                      <div className='flex items-center gap-2'>
                        <textarea
                          ref={setInputRef(box.id)}
                          value={box.text}
                          onChange={(e) =>
                            {
                              const value = e.target.value
                              // Auto-resize height
                              e.target.style.height = 'auto'
                              const max = 160
                              const nextHeight = Math.min(e.target.scrollHeight, max)
                              e.target.style.height = `${nextHeight}px`
                              e.target.style.overflowY = e.target.scrollHeight > max ? 'auto' : 'hidden'
                              setBoxes((prev) => prev.map((b) => (b.id === box.id ? { ...b, text: value } : b)))
                            }
                          }
                          onKeyDown={handleKeyDown(index, box.id)}
                          placeholder='Type. Press Ctrl+Enter to add another note'
                          rows={1}
                          className={`flex-1 bg-transparent outline-none text-sm overflow-y-auto no-scrollbar resize-none ${
                            isDark ? 'text-neutral-200 placeholder:text-neutral-500' : 'text-neutral-800 placeholder:text-neutral-400'
                          }`}
                        />
                        <button
                          onClick={() => (box.chartPayload ? toggleToChart(box.id) : handleMakeGraphFor(box.id))}
                          disabled={box.loading || (!box.chartPayload && !box.text.trim())}
                          className={`shrink-0 h-7 px-2 rounded-md border text-xs ${
                            isDark ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-800 disabled:opacity-50' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-50'
                          }`}
                        >
                          {box.loading ? 'Loading…' : (box.chartPayload ? 'Show chart' : 'Graph')}
                        </button>
                        <button
                          onClick={() => deleteNote(box.id)}
                          aria-label='Delete note'
                          title='Delete note'
                          className={`shrink-0 h-7 w-7 rounded-md border flex items-center justify-center ${
                            isDark ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <Trash2 className={`${iconBaseClass} ${iconColorClass}`} />
                        </button>
                      </div>
                      {!!box.error && (
                        <div className='mt-1 text-xs text-red-500'>{box.error}</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className='mb-1 flex items-center justify-between'>
                        <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Chart</span>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => toggleToNote(box.id)}
                            className={`h-7 px-2 rounded-md border text-xs ${isDark ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'}`}
                          >
                            Back to note
                          </button>
                          <button
                            onClick={() => deleteNote(box.id)}
                            aria-label='Delete note'
                            title='Delete note'
                            className={`h-7 w-7 rounded-md border flex items-center justify-center ${isDark ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'}`}
                          >
                            <Trash2 className={`${iconBaseClass} ${iconColorClass}`} />
                          </button>
                        </div>
                      </div>
                      <div className='overflow-hidden rounded-md'>
                        <ChartComponent payload={box.chartPayload} height={220} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            
          </div>
          <div className='w-2/3 h-full flex flex-col'>
            <div className={`h-8 w-full ${topbarBgClass} shrink-0 flex items-center justify-end px-2`}>
              <input
                id='pdf-file-input'
                type='file'
                accept='application/pdf'
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) setUploadedFile(f)
                }}
                className='hidden'
              />
              <label
                htmlFor='pdf-file-input'
                className={`cursor-pointer h-7 px-3 rounded-md border text-xs ${
                  isDark ? 'border-neutral-800 text-neutral-200 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Upload PDF
              </label>
            </div>
            <div className='flex-1 overflow-y-auto no-scrollbar'>
              <PdfViewer file={uploadedFile} onAddNote={(text: string) => {
                const newId = nextId
                setBoxes(prev => {
                  const updated = [...prev, { id: newId, text, mode: 'note' as const, error: null }]
                  return updated
                })
                setNextId(v => v + 1)
              }} />
            </div>
          </div>
        </div>
      </main>
      <style jsx global>{`
        /* Hide scrollbars while preserving scroll */
        #app-shell .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        #app-shell .no-scrollbar::-webkit-scrollbar { display: none; }

        /* Make viewer inherit page background and remove internal scroll */
        #app-shell .viewer-no-scroll .rpv-core__viewer,
        #app-shell .viewer-no-scroll .rpv-core__inner-pages,
        #app-shell .viewer-no-scroll .rpv-core__pages,
        #app-shell .viewer-no-scroll .rpv-core__scroll-container {
          background: transparent !important;
          height: auto !important;
          overflow: visible !important;
        }

        /* Round PDF pages and ensure white page background */
        #app-shell .viewer-no-scroll .rpv-core__page { 
          border-radius: 0.5rem; 
          overflow: hidden; 
          background: white; 
          clip-path: inset(0 round 0.5rem);
        }
        #app-shell .viewer-no-scroll .rpv-core__canvas-layer canvas { border-radius: 0.5rem; }
      `}</style>
    </div>
  )
}

export default page