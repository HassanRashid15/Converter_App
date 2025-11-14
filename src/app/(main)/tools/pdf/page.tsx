import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PDFConverter } from "@/components/tools/pdf-converter";

export const metadata: Metadata = {
  title: "PDF Converter",
  description: "Convert PDF to DOCX and vice versa with perfect formatting. Free online PDF converter.",
};

export default function PDFConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            PDF Converter
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert between PDF and DOCX formats while preserving formatting and layout
          </p>
        </div>

        {/* Converter Component */}
        <PDFConverter />

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Format Preservation</h3>
            <p className="text-sm text-muted-foreground">
              Maintain fonts, images, and layout during conversion
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">OCR Support</h3>
            <p className="text-sm text-muted-foreground">
              Extract text from scanned PDFs with optical character recognition
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Secure Processing</h3>
            <p className="text-sm text-muted-foreground">
              Your documents are processed securely and deleted immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


