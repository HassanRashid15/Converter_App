"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Image, 
  FileText, 
  Type, 
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Upload,
  Link
} from "lucide-react";
import { trackUserEngagement } from "@/components/analytics/google-analytics";

interface ConverterOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  fromFormats: string[];
  toFormats: string[];
  color: string;
  href: string;
}

const converterOptions: ConverterOption[] = [
  {
    id: "audio",
    name: "Audio Converter",
    description: "Convert between MP3, WAV, M4A, FLAC, AAC, OGG",
    icon: <Music className="h-8 w-8" />,
    fromFormats: ["MP3", "WAV", "M4A", "FLAC", "AAC", "OGG"],
    toFormats: ["MP3", "WAV", "M4A", "FLAC", "AAC", "OGG"],
    color: "blue",
    href: "/tools/audio"
  },
  {
    id: "image",
    name: "Image Converter",
    description: "Convert between PNG, JPG, WebP, GIF, BMP, TIFF",
    icon: <Image className="h-8 w-8" />,
    fromFormats: ["PNG", "JPG", "WebP", "GIF", "BMP", "TIFF"],
    toFormats: ["PNG", "JPG", "WebP", "GIF", "BMP", "TIFF"],
    color: "green",
    href: "/tools/image"
  },
  {
    id: "pdf",
    name: "PDF Converter",
    description: "Convert PDF to Word and Word to PDF",
    icon: <FileText className="h-8 w-8" />,
    fromFormats: ["PDF", "DOCX"],
    toFormats: ["PDF", "DOCX"],
    color: "red",
    href: "/tools/pdf"
  },
  {
    id: "text",
    name: "Text Tools",
    description: "Word count, case conversion, text to PDF",
    icon: <Type className="h-8 w-8" />,
    fromFormats: ["TXT", "MD", "RTF"],
    toFormats: ["PDF", "DOCX", "TXT"],
    color: "purple",
    href: "/tools/text"
  }
];

interface ConverterSelectorProps {
  onSelectConverter?: (converterId: string) => void;
  showUniversalOption?: boolean;
}

export function ConverterSelector({ onSelectConverter, showUniversalOption = true }: ConverterSelectorProps) {
  const [selectedConverter, setSelectedConverter] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleConverterSelect = (converterId: string) => {
    setSelectedConverter(converterId);
    setShowDetails(true);
    trackUserEngagement('converter_selected', { converter: converterId });
  };

  const handleProceed = () => {
    if (selectedConverter) {
      onSelectConverter?.(selectedConverter);
      trackUserEngagement('converter_proceeded', { converter: selectedConverter });
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 hover:border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/30';
      case 'green':
        return 'border-green-200 bg-green-50 dark:bg-green-950/20 hover:border-green-300 hover:bg-green-100 dark:hover:bg-green-950/30';
      case 'red':
        return 'border-red-200 bg-red-50 dark:bg-red-950/20 hover:border-red-300 hover:bg-red-100 dark:hover:bg-red-950/30';
      case 'purple':
        return 'border-purple-200 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-950/30';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-950/20 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-950/30';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'red': return 'text-red-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  if (showDetails && selectedConverter) {
    const converter = converterOptions.find(c => c.id === selectedConverter);
    if (!converter) return null;

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => {
            setShowDetails(false);
            setSelectedConverter(null);
          }}
          className="mb-4"
        >
          ← Back to Converter Selection
        </Button>

        {/* Converter Details */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 ${getColorClasses(converter.color)} mb-4`}>
            <div className={getIconColor(converter.color)}>
              {converter.icon}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{converter.name}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {converter.description}
          </p>
        </div>

        {/* Format Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Supported Input Formats
            </h3>
            <div className="flex flex-wrap gap-2">
              {converter.fromFormats.map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-green-500" />
              Output Formats
            </h3>
            <div className="flex flex-wrap gap-2">
              {converter.toFormats.map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="p-6 border rounded-lg bg-muted/30">
          <h3 className="font-semibold mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">High-quality conversion</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Batch processing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Advanced settings</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Fast processing</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleProceed}
            className="flex items-center gap-2"
            size="lg"
          >
            <Zap className="h-5 w-5" />
            Use {converter.name}
          </Button>
          {showUniversalOption && (
            <Button
              variant="outline"
              onClick={() => onSelectConverter?.('universal')}
              className="flex items-center gap-2"
              size="lg"
            >
              <Globe className="h-5 w-5" />
              Try Universal Converter
            </Button>
          )}
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
          Select the type of file conversion you need. Each converter is optimized for specific file types and formats.
        </p>
      </div>

      {/* Universal Converter Option */}
      {showUniversalOption && (
        <div className="mb-8">
          <div className="p-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Universal Converter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload any file or paste a URL - we'll automatically detect the format and suggest the best conversion options.
              </p>
              <Button
                onClick={() => onSelectConverter?.('universal')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link className="h-4 w-4 mr-2" />
                Try Universal Converter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Converter Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {converterOptions.map((converter) => (
          <div
            key={converter.id}
            className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg
              ${selectedConverter === converter.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-md' 
                : getColorClasses(converter.color)
              }
            `}
            onClick={() => handleConverterSelect(converter.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getColorClasses(converter.color)}`}>
                <div className={getIconColor(converter.color)}>
                  {converter.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{converter.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {converter.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {converter.fromFormats.slice(0, 3).map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {format}
                    </span>
                  ))}
                  {converter.fromFormats.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                      +{converter.fromFormats.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              {selectedConverter === converter.id && (
                <CheckCircle className="h-6 w-6 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2">💡 Quick Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click on any converter to see detailed information and supported formats</li>
          <li>• Use the Universal Converter for files from URLs or unknown formats</li>
          <li>• All converters support drag-and-drop file upload</li>
          <li>• Advanced settings are available for professional-quality conversions</li>
        </ul>
      </div>
    </div>
  );
}

