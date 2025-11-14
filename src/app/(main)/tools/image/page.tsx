import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ImageConverter } from "@/components/tools/image-converter";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Convert between PNG, JPG, WebP formats with compression options. Free online image converter.",
};

export default function ImageConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Image Converter
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert between PNG, JPG, WebP and other image formats with compression options
          </p>
        </div>

        {/* Converter Component */}
        <ImageConverter />

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-sm text-muted-foreground">
              Adjust compression levels to balance file size and image quality
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Batch Processing</h3>
            <p className="text-sm text-muted-foreground">
              Convert multiple images at once to save time and effort
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Format Support</h3>
            <p className="text-sm text-muted-foreground">
              Support for PNG, JPG, WebP, GIF, BMP, and more formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


