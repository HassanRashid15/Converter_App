"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Video, 
  Image, 
  FileText, 
  Archive,
  Code,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle,
  Star
} from "lucide-react";
import Link from "next/link";
import { trackUserEngagement } from "@/components/analytics/google-analytics";

interface ConversionPair {
  id: string;
  from: string;
  to: string;
  description: string;
  popular?: boolean;
}

interface ConverterCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  conversions: ConversionPair[];
}

const converterCategories: ConverterCategory[] = [
  {
    id: "audio",
    name: "Audio Converters",
    icon: <Music className="h-6 w-6" />,
    color: "blue",
    description: "Convert between different audio formats",
    conversions: [
      { id: "mp3-wav", from: "MP3", to: "WAV", description: "High quality audio conversion", popular: true },
      { id: "mp3-aac", from: "MP3", to: "AAC", description: "Advanced audio coding" },
      { id: "mp3-ogg", from: "MP3", to: "OGG", description: "Open source format" },
      { id: "mp3-flac", from: "MP3", to: "FLAC", description: "Lossless compression" },
      { id: "wav-flac", from: "WAV", to: "FLAC", description: "Uncompressed to lossless" },
      { id: "m4a-mp3", from: "M4A", to: "MP3", description: "Apple format to universal", popular: true },
      { id: "aiff-mp3", from: "AIFF", to: "MP3", description: "Apple audio to MP3" },
      { id: "wma-mp3", from: "WMA", to: "MP3", description: "Windows Media to MP3" },
      { id: "ogg-aac", from: "OGG", to: "AAC", description: "Open source to advanced" },
      { id: "amr-mp3", from: "AMR", to: "MP3", description: "Mobile audio to MP3" }
    ]
  },
  {
    id: "video",
    name: "Video Converters",
    icon: <Video className="h-6 w-6" />,
    color: "red",
    description: "Convert video formats and extract audio",
    conversions: [
      { id: "mp4-mp3", from: "MP4", to: "MP3", description: "Extract audio from MP4", popular: true },
      { id: "mp4-wav", from: "MP4", to: "WAV", description: "Extract high-quality audio" },
      { id: "mov-mp3", from: "MOV", to: "MP3", description: "Extract audio from MOV" },
      { id: "avi-mp3", from: "AVI", to: "MP3", description: "Extract audio from AVI" },
      { id: "mp4-mov", from: "MP4", to: "MOV", description: "Universal to Apple format" },
      { id: "mp4-avi", from: "MP4", to: "AVI", description: "Universal to Windows format" },
      { id: "mp4-mkv", from: "MP4", to: "MKV", description: "Universal to Matroska" },
      { id: "mp4-webm", from: "MP4", to: "WEBM", description: "Universal to web format" },
      { id: "flv-mp4", from: "FLV", to: "MP4", description: "Flash to universal" },
      { id: "3gp-mp4", from: "3GP", to: "MP4", description: "Mobile to universal" }
    ]
  },
  {
    id: "image",
    name: "Image Converters",
    icon: <Image className="h-6 w-6" />,
    color: "green",
    description: "Convert image formats",
    conversions: [
      { id: "jpg-png", from: "JPG", to: "PNG", description: "Lossy to lossless", popular: true },
      { id: "jpg-webp", from: "JPG", to: "WEBP", description: "Modern web format" },
      { id: "jpg-svg", from: "JPG", to: "SVG", description: "Raster to vector" },
      { id: "png-webp", from: "PNG", to: "WEBP", description: "Lossless to modern" },
      { id: "png-bmp", from: "PNG", to: "BMP", description: "Lossless to bitmap" },
      { id: "png-tiff", from: "PNG", to: "TIFF", description: "Lossless to high quality" },
      { id: "heic-jpg", from: "HEIC", to: "JPG", description: "Apple format to universal", popular: true },
      { id: "svg-png", from: "SVG", to: "PNG", description: "Vector to raster" },
      { id: "gif-mp4", from: "GIF", to: "MP4", description: "Animated to video" },
      { id: "bmp-jpg", from: "BMP", to: "JPG", description: "Bitmap to compressed" }
    ]
  },
  {
    id: "document",
    name: "Document Converters",
    icon: <FileText className="h-6 w-6" />,
    color: "purple",
    description: "Convert text and document formats",
    conversions: [
      { id: "docx-pdf", from: "DOCX", to: "PDF", description: "Word to PDF", popular: true },
      { id: "docx-txt", from: "DOCX", to: "TXT", description: "Word to plain text" },
      { id: "doc-rtf", from: "DOC", to: "RTF", description: "Word to rich text" },
      { id: "pdf-pptx", from: "PDF", to: "PPTX", description: "PDF to PowerPoint" },
      { id: "pdf-xlsx", from: "PDF", to: "XLSX", description: "PDF to Excel" },
      { id: "pdf-txt", from: "PDF", to: "TXT", description: "PDF to text", popular: true },
      { id: "pptx-pdf", from: "PPTX", to: "PDF", description: "PowerPoint to PDF" },
      { id: "xlsx-csv", from: "XLSX", to: "CSV", description: "Excel to CSV" },
      { id: "txt-pdf", from: "TXT", to: "PDF", description: "Text to PDF" },
      { id: "odt-docx", from: "ODT", to: "DOCX", description: "OpenDocument to Word" }
    ]
  },
  {
    id: "archive",
    name: "Archive Converters",
    icon: <Archive className="h-6 w-6" />,
    color: "orange",
    description: "Convert compressed file formats",
    conversions: [
      { id: "zip-rar", from: "ZIP", to: "RAR", description: "ZIP to RAR archive" },
      { id: "7z-zip", from: "7Z", to: "ZIP", description: "7-Zip to ZIP" },
      { id: "tar-zip", from: "TAR", to: "ZIP", description: "TAR to ZIP" },
      { id: "iso-zip", from: "ISO", to: "ZIP", description: "ISO to ZIP" }
    ]
  },
  {
    id: "code",
    name: "Code Converters",
    icon: <Code className="h-6 w-6" />,
    color: "indigo",
    description: "Convert code and data formats (for developers)",
    conversions: [
      { id: "json-csv", from: "JSON", to: "CSV", description: "JSON to CSV data" },
      { id: "json-xml", from: "JSON", to: "XML", description: "JSON to XML" },
      { id: "csv-xlsx", from: "CSV", to: "XLSX", description: "CSV to Excel" },
      { id: "yaml-json", from: "YAML", to: "JSON", description: "YAML to JSON" },
      { id: "html-markdown", from: "HTML", to: "Markdown", description: "HTML to Markdown" },
      { id: "markdown-pdf", from: "Markdown", to: "PDF", description: "Markdown to PDF" }
    ]
  }
];

export function ComprehensiveConverterSelector() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 hover:border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/30';
      case 'red':
        return 'border-red-200 bg-red-50 dark:bg-red-950/20 hover:border-red-300 hover:bg-red-100 dark:hover:bg-red-950/30';
      case 'green':
        return 'border-green-200 bg-green-50 dark:bg-green-950/20 hover:border-green-300 hover:bg-green-100 dark:hover:bg-green-950/30';
      case 'purple':
        return 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/30';
      case 'orange':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-300 hover:bg-orange-100 dark:hover:bg-orange-950/30';
      case 'indigo':
        return 'border-indigo-200 bg-indigo-50 dark:bg-indigo-950/20 hover:border-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950/30';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-950/20 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-950/30';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'red': return 'text-red-500';
      case 'green': return 'text-green-500';
      case 'purple': return 'text-purple-500';
      case 'orange': return 'text-orange-500';
      case 'indigo': return 'text-indigo-500';
      default: return 'text-gray-500';
    }
  };

  const handleConversionClick = (conversionId: string, categoryId: string) => {
    trackUserEngagement('conversion_selected', { 
      conversion: conversionId, 
      category: categoryId 
    });
  };

  if (selectedCategory) {
    const category = converterCategories.find(c => c.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => setSelectedCategory(null)}
          className="mb-4"
        >
          ← Back to Categories
        </Button>

        {/* Category Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 ${getColorClasses(category.color)} mb-4`}>
            <div className={getIconColor(category.color)}>
              {category.icon}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {category.description}
          </p>
        </div>

        {/* Conversion Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.conversions.map((conversion) => (
            <Link
              key={conversion.id}
              href={`/tools/convert/${conversion.id}`}
              onClick={() => handleConversionClick(conversion.id, category.id)}
              className="block"
            >
              <div className={`
                p-6 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105
                ${conversion.popular 
                  ? 'border-blue-300 bg-blue-50 dark:bg-blue-950/20 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm font-medium">
                        {conversion.from}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-500" />
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">
                        {conversion.to}
                      </span>
                    </div>
                    {conversion.popular && (
                      <Star className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <Zap className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {conversion.description}
                </p>
                {conversion.popular && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Popular
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Category Tips */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">💡 Tips for {category.name}</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click on any conversion to open the dedicated converter</li>
            <li>• Popular conversions are marked with a star</li>
            <li>• All conversions maintain quality and preserve metadata</li>
            <li>• Batch processing available for multiple files</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Choose Your Converter
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select a category to see all available conversion options. Each converter is optimized for specific file types.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {converterCategories.map((category) => (
          <div
            key={category.id}
            className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105
              ${getColorClasses(category.color)}
            `}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                <div className={getIconColor(category.color)}>
                  {category.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {category.conversions.length} conversions
                  </span>
                  <div className="flex items-center gap-1">
                    {category.conversions.filter(c => c.popular).length > 0 && (
                      <Star className="h-3 w-3 text-yellow-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {category.conversions.filter(c => c.popular).length} popular
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {converterCategories.reduce((sum, cat) => sum + cat.conversions.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Conversions</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {converterCategories.length}
          </div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {converterCategories.reduce((sum, cat) => sum + cat.conversions.filter(c => c.popular).length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Popular</div>
        </div>
        <div className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold text-orange-600">100%</div>
          <div className="text-sm text-muted-foreground">Free</div>
        </div>
      </div>
    </div>
  );
}
