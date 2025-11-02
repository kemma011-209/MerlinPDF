(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PdfViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.2_048eab391ea2e03c70ee64ac0670005b/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_@babel+core@7.2_048eab391ea2e03c70ee64ac0670005b/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$pdf$2d$viewer$2b$core$40$3$2e$12_9b3ae2bc62ecd0c95d041100248c5b9c$2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@react-pdf-viewer+core@3.12_9b3ae2bc62ecd0c95d041100248c5b9c/node_modules/@react-pdf-viewer/core/lib/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PdfViewer = ({ onAddNote, onFileSelected, file })=>{
    _s();
    const pageLayout = {
        buildPageStyles: ()=>({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fafafa'
            })
    };
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const objectUrlRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [pdfUrl, setPdfUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("/example.pdf");
    const [isDragging, setIsDragging] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [tooltip, setTooltip] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        x: 0,
        y: 0,
        text: '',
        visible: false
    });
    const clearSelectionAndHide = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "PdfViewer.useCallback[clearSelectionAndHide]": ()=>{
            const sel = window.getSelection?.();
            if (sel && sel.removeAllRanges) sel.removeAllRanges();
            setTooltip({
                "PdfViewer.useCallback[clearSelectionAndHide]": (t)=>({
                        ...t,
                        visible: false,
                        text: ''
                    })
            }["PdfViewer.useCallback[clearSelectionAndHide]"]);
        }
    }["PdfViewer.useCallback[clearSelectionAndHide]"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PdfViewer.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            const handleMouseUp = {
                "PdfViewer.useEffect.handleMouseUp": ()=>{
                    const selection = window.getSelection?.();
                    const text = selection?.toString()?.trim() || '';
                    if (!text) {
                        setTooltip({
                            "PdfViewer.useEffect.handleMouseUp": (t)=>({
                                    ...t,
                                    visible: false,
                                    text: ''
                                })
                        }["PdfViewer.useEffect.handleMouseUp"]);
                        return;
                    }
                    if (!selection || selection.rangeCount === 0) return;
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const x = rect.left - containerRect.left;
                    const y = rect.top - containerRect.top - 32;
                    setTooltip({
                        x,
                        y: y < 0 ? 0 : y,
                        text,
                        visible: true
                    });
                }
            }["PdfViewer.useEffect.handleMouseUp"];
            const handleScroll = {
                "PdfViewer.useEffect.handleScroll": ()=>setTooltip({
                        "PdfViewer.useEffect.handleScroll": (t)=>({
                                ...t,
                                visible: false
                            })
                    }["PdfViewer.useEffect.handleScroll"])
            }["PdfViewer.useEffect.handleScroll"];
            const handleKey = {
                "PdfViewer.useEffect.handleKey": (e)=>{
                    if (e.key === 'Escape') clearSelectionAndHide();
                }
            }["PdfViewer.useEffect.handleKey"];
            container.addEventListener('mouseup', handleMouseUp);
            container.addEventListener('scroll', handleScroll, true);
            window.addEventListener('keydown', handleKey);
            return ({
                "PdfViewer.useEffect": ()=>{
                    container.removeEventListener('mouseup', handleMouseUp);
                    container.removeEventListener('scroll', handleScroll, true);
                    window.removeEventListener('keydown', handleKey);
                }
            })["PdfViewer.useEffect"];
        }
    }["PdfViewer.useEffect"], [
        clearSelectionAndHide
    ]);
    const handleAdd = ()=>{
        if (!tooltip.text) return;
        onAddNote?.(tooltip.text);
        clearSelectionAndHide();
    };
    const setNewPdfFromFile = (file)=>{
        if (!file || file.type !== 'application/pdf') return;
        const url = URL.createObjectURL(file);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = url;
        setPdfUrl(url);
        onFileSelected?.(file);
    };
    const onFileInputChange = (e)=>{
        const f = e.target.files?.[0];
        if (f) setNewPdfFromFile(f);
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PdfViewer.useEffect": ()=>{
            return ({
                "PdfViewer.useEffect": ()=>{
                    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
                }
            })["PdfViewer.useEffect"];
        }
    }["PdfViewer.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PdfViewer.useEffect": ()=>{
            if (file) setNewPdfFromFile(file);
        }
    }["PdfViewer.useEffect"], [
        file
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "relative w-full max-w-[900px] h-auto viewer-no-scroll p-2 sm:p-3",
            onDragOver: (e)=>{
                e.preventDefault();
                setIsDragging(true);
            },
            onDragEnter: (e)=>{
                e.preventDefault();
                setIsDragging(true);
            },
            onDragLeave: (e)=>{
                e.preventDefault();
                setIsDragging(false);
            },
            onDrop: (e)=>{
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer?.files?.[0];
                if (file) setNewPdfFromFile(file);
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$pdf$2d$viewer$2b$core$40$3$2e$12_9b3ae2bc62ecd0c95d041100248c5b9c$2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Worker"], {
                    workerUrl: "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$react$2d$pdf$2d$viewer$2b$core$40$3$2e$12_9b3ae2bc62ecd0c95d041100248c5b9c$2f$node_modules$2f40$react$2d$pdf$2d$viewer$2f$core$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewer"], {
                        fileUrl: pdfUrl,
                        pageLayout: pageLayout,
                        theme: {
                            theme: 'light',
                            cssVariables: {
                                '--rpv-core__viewer-background-color': '#fafafa'
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/PdfViewer.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/PdfViewer.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                isDragging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 z-30 flex items-center justify-center bg-black/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none w-full h-full border-2 border-dashed border-white/80 rounded-xl"
                        }, void 0, false, {
                            fileName: "[project]/components/PdfViewer.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute px-3 py-1 rounded-md bg-white text-neutral-800 text-xs shadow",
                            children: "Drop PDF to view"
                        }, void 0, false, {
                            fileName: "[project]/components/PdfViewer.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PdfViewer.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                tooltip.visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        left: tooltip.x,
                        top: tooltip.y
                    },
                    className: "absolute z-50 px-2 py-1 rounded-md border shadow-sm bg-white text-neutral-800 text-xs flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "max-w-[320px] truncate",
                            children: tooltip.text
                        }, void 0, false, {
                            fileName: "[project]/components/PdfViewer.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleAdd,
                            className: "h-6 px-2 rounded border text-xs hover:bg-neutral-100",
                            children: "Add note"
                        }, void 0, false, {
                            fileName: "[project]/components/PdfViewer.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_$40$babel$2b$core$40$7$2e$2_048eab391ea2e03c70ee64ac0670005b$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: clearSelectionAndHide,
                            className: "h-6 px-2 rounded border text-xs hover:bg-neutral-100",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/components/PdfViewer.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PdfViewer.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/PdfViewer.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/PdfViewer.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PdfViewer, "L7HfOXsDWnsoJF2S9U8ezkqANNg=");
_c = PdfViewer;
const __TURBOPACK__default__export__ = PdfViewer;
var _c;
__turbopack_context__.k.register(_c, "PdfViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PdfViewer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/PdfViewer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_PdfViewer_tsx_eb72abe3._.js.map