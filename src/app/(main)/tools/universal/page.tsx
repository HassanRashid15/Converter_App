import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { UniversalConverter } from "@/components/tools/universal-converter";
import { StructuredData, ToolStructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Universal File Converter - Convert Any File Online | ToolNest",
  description: "Convert any file format online. Upload files or paste URLs from anywhere. Automatic format detection for audio, image, PDF, and text files. Free, fast, and secure.",
  keywords: [
    "universal converter",
    "file converter",
    "online converter",
    "format converter",
    "audio converter",
    "image converter",
    "PDF converter",
    "text converter",
    "URL converter",
    "automatic format detection",
    "free converter",
    "batch converter"
  ],
  openGraph: {
    title: "Universal File Converter - Convert Any File Online",
    description: "Convert any file format online. Upload files or paste URLs from anywhere. Automatic format detection for audio, image, PDF, and text files.",
    type: "website",
    url: `${siteConfig.url}/tools/universal`,
    images: [
      {
        url: `${siteConfig.url}/og-universal-converter.png`,
        width: 1200,
        height: 630,
        alt: "ToolNest Universal Converter"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal File Converter - Convert Any File Online",
    description: "Convert any file format online. Upload files or paste URLs from anywhere. Automatic format detection for audio, image, PDF, and text files.",
    images: [`${siteConfig.url}/og-universal-converter.png`]
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/universal`
  }
};

export default function UniversalConverterPage() {
  return (
    <>
      <ToolStructuredData
        toolName="Universal Converter"
        toolDescription="Convert any file format online with automatic format detection. Upload files or paste URLs from anywhere."
        toolUrl={`${siteConfig.url}/tools/universal`}
        supportedFormats={["mp3", "wav", "m4a", "flac", "aac", "ogg", "png", "jpg", "webp", "gif", "bmp", "tiff", "pdf", "docx", "txt", "md", "rtf"]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Universal File Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert any file format online. Upload files or paste URLs from anywhere. 
              We automatically detect the format and suggest the best conversion options.
            </p>
          </div>

          {/* Converter Component */}
          <UniversalConverter />

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🌐 URL Support</h3>
              <p className="text-sm text-muted-foreground">
                Paste any file URL and we'll automatically download and convert it
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🔍 Auto Detection</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent format detection with high accuracy for all file types
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">⚡ Universal</h3>
              <p className="text-sm text-muted-foreground">
                One tool for all your conversion needs - audio, image, PDF, and text
              </p>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2>Why Choose Our Universal Converter?</h2>
            <p>
              Our universal file converter is the most versatile tool in our arsenal. Whether you have a file on your computer 
              or a URL from the web, our intelligent system automatically detects the file format and provides the best conversion 
              options. No need to know the specific converter - just upload or paste a URL and we'll handle the rest.
            </p>
            
            <h3>Supported File Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4>Audio Files</h4>
                <ul>
                  <li>MP3, WAV, M4A, FLAC, AAC, OGG</li>
                  <li>High-quality audio conversion</li>
                  <li>Customizable bitrate and sample rate</li>
                </ul>
              </div>
              <div>
                <h4>Image Files</h4>
                <ul>
                  <li>PNG, JPG, WebP, GIF, BMP, TIFF</li>
                  <li>Quality control and compression</li>
                  <li>Batch processing support</li>
                </ul>
              </div>
              <div>
                <h4>Document Files</h4>
                <ul>
                  <li>PDF, DOCX, DOC</li>
                  <li>Format preservation</li>
                  <li>OCR support for scanned documents</li>
                </ul>
              </div>
              <div>
                <h4>Text Files</h4>
                <ul>
                  <li>TXT, MD, RTF</li>
                  <li>Word count and analysis</li>
                  <li>Case conversion and formatting</li>
                </ul>
              </div>
            </div>

            <h3>How It Works</h3>
            <ol>
              <li><strong>Upload or Paste URL:</strong> Either drag and drop a file or paste a URL from anywhere on the web</li>
              <li><strong>Automatic Detection:</strong> Our system analyzes the file and detects its format with high accuracy</li>
              <li><strong>Choose Target Format:</strong> Select from available conversion options based on the detected format</li>
              <li><strong>Convert & Download:</strong> Get your converted file in seconds with maintained quality</li>
            </ol>

            <h3>Advanced Features</h3>
            <ul>
              <li>URL-based file conversion from any web source</li>
              <li>Intelligent format detection with confidence scoring</li>
              <li>Batch processing for multiple files</li>
              <li>Advanced quality settings for professional use</li>
              <li>Conversion history and tracking</li>
              <li>Secure processing with automatic file cleanup</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

