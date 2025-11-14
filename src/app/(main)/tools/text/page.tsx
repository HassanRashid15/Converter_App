import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TextTools } from "@/components/tools/text-tools";

export const metadata: Metadata = {
  title: "Text Tools",
  description: "Word count, case changer, text to PDF, and more text utilities. Free online text tools.",
};

export default function TextToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Text Tools
          </h1>
          <p className="text-lg text-muted-foreground">
            Powerful text utilities including word count, case conversion, and text to PDF
          </p>
        </div>

        {/* Tools Component */}
        <TextTools />

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Word Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed word count, character count, and reading time estimates
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Case Conversion</h3>
            <p className="text-sm text-muted-foreground">
              Transform text between uppercase, lowercase, title case, and more
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">PDF Generation</h3>
            <p className="text-sm text-muted-foreground">
              Convert your text to professionally formatted PDF documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


