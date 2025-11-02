"use client"
import Image from 'next/image'
import React from 'react'
import { Home, Folder, Settings, Sun, Moon } from 'lucide-react'
import dynamic from 'next/dynamic'
const PdfViewer = dynamic(() => import('../components/PdfViewer'), { ssr: false })

const page = () => {
  const [isDark, setIsDark] = React.useState(false)
  const iconColorClass = isDark ? 'text-neutral-200' : 'text-neutral-800'
  const iconBaseClass = 'h-5 w-5 stroke-[0.9] transition-colors duration-300'
  const sidebarBorderClass = isDark ? 'border-neutral-800' : 'border-neutral-200'
  const topbarBgClass = isDark ? 'bg-neutral-900' : 'bg-neutral-50'
  const [selectedTileId, setSelectedTileId] = React.useState<number | null>(null)
  const topbarTextClass = isDark ? 'text-neutral-200' : 'text-neutral-700'
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
            <div className={`h-8 w-full ${topbarBgClass} ${topbarTextClass} shrink-0 flex items-center px-2 text-sm`}>Hello</div>
            <div className='flex-1 overflow-y-auto no-scrollbar pt-4'>
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedTileId(i)}
                  className={`mb-2 h-20 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedTileId === i ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className='w-2/3 h-full flex flex-col'>
            <div className={`h-8 w-full ${topbarBgClass} shrink-0`}></div>
            <div className='flex-1 overflow-y-auto no-scrollbar'>
              <PdfViewer />
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