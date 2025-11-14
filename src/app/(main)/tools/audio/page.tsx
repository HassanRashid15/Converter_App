import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AudioConverter } from "@/components/tools/audio-converter";
import { StructuredData, ToolStructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Free Audio Converter - MP3, WAV, M4A Online | ToolNest",
  description: "Convert audio files between MP3, WAV, M4A, FLAC, AAC, and OGG formats. High-quality audio conversion with advanced settings. Free, fast, and secure.",
  keywords: [
    "audio converter",
    "MP3 converter", 
    "WAV converter",
    "M4A converter",
    "FLAC converter",
    "AAC converter",
    "OGG converter",
    "audio format converter",
    "free audio converter",
    "online audio converter",
    "batch audio conversion",
    "high quality audio converter"
  ],
  openGraph: {
    title: "Free Audio Converter - MP3, WAV, M4A Online",
    description: "Convert audio files between MP3, WAV, M4A, FLAC, AAC, and OGG formats. High-quality audio conversion with advanced settings.",
    type: "website",
    url: `${siteConfig.url}/tools/audio`,
    images: [
      {
        url: `${siteConfig.url}/og-audio-converter.png`,
        width: 1200,
        height: 630,
        alt: "ToolNest Audio Converter"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Audio Converter - MP3, WAV, M4A Online",
    description: "Convert audio files between MP3, WAV, M4A, FLAC, AAC, and OGG formats. High-quality audio conversion with advanced settings.",
    images: [`${siteConfig.url}/og-audio-converter.png`]
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/audio`
  }
};

export default function AudioConverterPage() {
  return (
    <>
      <ToolStructuredData
        toolName="Audio Converter"
        toolDescription="Convert audio files between MP3, WAV, M4A, FLAC, AAC, and OGG formats with high quality output"
        toolUrl={`${siteConfig.url}/tools/audio`}
        supportedFormats={["mp3", "wav", "m4a", "flac", "aac", "ogg"]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Free Audio Converter - MP3, WAV, M4A Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert between MP3, WAV, M4A, FLAC, AAC, and OGG formats with high quality output. 
              Advanced settings for professional audio conversion.
            </p>
          </div>

          {/* Converter Component */}
          <AudioConverter />

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🎵 High Quality</h3>
              <p className="text-sm text-muted-foreground">
                Maintain audio quality during conversion with advanced algorithms and customizable bitrate settings
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">⚡ Fast Processing</h3>
              <p className="text-sm text-muted-foreground">
                Convert large audio files in seconds with our optimized engine and progress tracking
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">🔄 Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Support for MP3, WAV, M4A, FLAC, AAC, OGG and more popular audio formats
              </p>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <h2>Why Choose Our Audio Converter?</h2>
            <p>
              Our free audio converter supports all major audio formats including MP3, WAV, M4A, FLAC, AAC, and OGG. 
              Whether you need to convert music files for different devices, compress audio for web use, or maintain 
              high-quality audio for professional projects, our tool provides the perfect solution.
            </p>
            
            <h3>Supported Audio Formats</h3>
            <ul>
              <li><strong>MP3</strong> - Most compatible format, perfect for music and podcasts</li>
              <li><strong>WAV</strong> - Uncompressed, high-quality format for professional use</li>
              <li><strong>M4A</strong> - Apple's audio format, great for iOS devices</li>
              <li><strong>FLAC</strong> - Lossless compression, maintains original quality</li>
              <li><strong>AAC</strong> - Advanced audio coding, efficient compression</li>
              <li><strong>OGG</strong> - Open source format, royalty-free</li>
            </ul>

            <h3>Advanced Features</h3>
            <ul>
              <li>Customizable bitrate settings (128-320 kbps)</li>
              <li>Sample rate options (22kHz to 96kHz)</li>
              <li>Batch processing capabilities</li>
              <li>Drag and drop file upload</li>
              <li>Keyboard shortcuts for power users</li>
              <li>Conversion history tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

