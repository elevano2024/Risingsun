"use client";

import { useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

type PdfPreviewProps = {
  file: string;
  width: number;
};

export default function PdfPreview({ file, width }: PdfPreviewProps) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <Document file={file}>
      <Page
        pageNumber={1}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  );
}
