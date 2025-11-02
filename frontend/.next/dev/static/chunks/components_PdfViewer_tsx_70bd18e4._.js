(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PdfViewer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_pdfjs-dist_build_pdf_3db3701a.js",
  "static/chunks/node_modules_@react-pdf-viewer_core_lib_76c7803f._.js",
  "static/chunks/node_modules_next_dist_compiled_bf0c3dc0._.js",
  "static/chunks/components_PdfViewer_tsx_eb72abe3._.js",
  {
    "path": "static/chunks/node_modules_@react-pdf-viewer_core_lib_styles_index_c13b7429.css",
    "included": [
      "[project]/node_modules/@react-pdf-viewer/core/lib/styles/index.css [app-client] (css)"
    ]
  },
  "static/chunks/components_PdfViewer_tsx_10006326._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/PdfViewer.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);