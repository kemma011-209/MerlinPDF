"use client"
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import type { PageLayout } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

const PdfViewer = () => {
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

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[900px] h-auto viewer-no-scroll p-2 sm:p-3'>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/example.pdf"
            pageLayout={pageLayout}
            theme={{
              theme: 'light',
              cssVariables: {
                '--rpv-core__viewer-background-color': '#fafafa',
              },
            }}
          />
        </Worker>
      </div>
    </div>
  )
}

export default PdfViewer


