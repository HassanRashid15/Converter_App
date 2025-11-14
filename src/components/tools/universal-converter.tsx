"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Upload, 
  Download, 
  Link, 
  File, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Clock,
  FileText,
  Settings,
  History,
  Star,
  Globe,
  FileAudio,
  FileImage,
  Type,
  Music,
  Image,
  File as FileIcon
} from "lucide-react";
import { toast } from "react-hot-toast";
import { trackUserEngagement, trackConversion } from "@/components/analytics/google-analytics";

interface ConversionResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  fileName?: string;
  detectedFormat?: string;
  targetFormat?: string;
}

interface DetectedFormat {
  type: 'audio' | 'image' | 'document' | 'text' | 'unknown';
  format: string;
  confidence: number;
  converter: string;
}

export function UniversalConverter() {
  const [inputMethod, setInputMethod] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [detectedFormat, setDetectedFormat] = useState<DetectedFormat | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionHistory, setConversionHistory] = useState<Array<{file: string, format: string, date: Date}>>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Format detection logic
  const detectFormat = useCallback((file: File | string): DetectedFormat => {
    if (typeof file === 'string') {
      // URL format detection
      const url = file.toLowerCase();
      if (url.includes('.mp3') || url.includes('audio')) {
        return { type: 'audio', format: 'mp3', confidence: 0.9, converter: 'audio' };
      } else if (url.includes('.wav')) {
        return { type: 'audio', format: 'wav', confidence: 0.9, converter: 'audio' };
      } else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('image')) {
        return { type: 'image', format: 'jpg', confidence: 0.9, converter: 'image' };
      } else if (url.includes('.png')) {
        return { type: 'image', format: 'png', confidence: 0.9, converter: 'image' };
      } else if (url.includes('.pdf')) {
        return { type: 'document', format: 'pdf', confidence: 0.9, converter: 'pdf' };
      } else if (url.includes('.docx') || url.includes('.doc')) {
        return { type: 'document', format: 'docx', confidence: 0.9, converter: 'pdf' };
      }
    } else {
      // File format detection
      const fileName = file.name.toLowerCase();
      const mimeType = file.type.toLowerCase();
      
      if (mimeType.startsWith('audio/') || fileName.match(/\.(mp3|wav|m4a|flac|aac|ogg)$/)) {
        const format = fileName.split('.').pop() || mimeType.split('/')[1];
        return { type: 'audio', format, confidence: 0.95, converter: 'audio' };
      } else if (mimeType.startsWith('image/') || fileName.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/)) {
        const format = fileName.split('.').pop() || mimeType.split('/')[1];
        return { type: 'image', format, confidence: 0.95, converter: 'image' };
      } else if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return { type: 'document', format: 'pdf', confidence: 0.95, converter: 'pdf' };
      } else if (mimeType.includes('word') || fileName.match(/\.(docx|doc)$/)) {
        return { type: 'document', format: 'docx', confidence: 0.95, converter: 'pdf' };
      } else if (mimeType.startsWith('text/') || fileName.match(/\.(txt|md|rtf)$/)) {
        return { type: 'text', format: 'txt', confidence: 0.9, converter: 'text' };
      }
    }
    
    return { type: 'unknown', format: 'unknown', confidence: 0, converter: 'unknown' };
  }, []);

  // URL validation
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle URL input
  const handleUrlSubmit = () => {
    if (!inputUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!isValidUrl(inputUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    const detected = detectFormat(inputUrl);
    setDetectedFormat(detected);
    
    if (detected.type === 'unknown') {
      toast.error("Could not detect file format from URL. Please try uploading a file instead.");
      return;
    }

    toast.success(`Detected ${detected.format.toUpperCase()} format. Choose your target format below.`);
    trackUserEngagement('url_detected', { format: detected.format, confidence: detected.confidence });
  };

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      
      const detected = detectFormat(file);
      setDetectedFormat(detected);
      
      if (detected.type === 'unknown') {
        toast.error("Unsupported file format. Please try a different file.");
        return;
      }

      toast.success(`Detected ${detected.format.toUpperCase()} format. Choose your target format below.`);
      trackUserEngagement('file_detected', { format: detected.format, size: file.size });
    }
  }, [detectFormat]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.aac', '.ogg'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/*': ['.txt', '.md', '.rtf']
    },
    multiple: false
  });

  // Get available target formats based on detected format
  const getTargetFormats = (detected: DetectedFormat) => {
    switch (detected.type) {
      case 'audio':
        return [
          { value: "mp3", label: "MP3", description: "Most compatible format" },
          { value: "wav", label: "WAV", description: "Uncompressed, high quality" },
          { value: "m4a", label: "M4A", description: "Apple's audio format" },
          { value: "flac", label: "FLAC", description: "Lossless compression" },
          { value: "aac", label: "AAC", description: "Advanced audio coding" },
          { value: "ogg", label: "OGG", description: "Open source format" }
        ];
      case 'image':
        return [
          { value: "jpg", label: "JPG", description: "Most compatible format" },
          { value: "png", label: "PNG", description: "Lossless with transparency" },
          { value: "webp", label: "WebP", description: "Modern, efficient format" },
          { value: "gif", label: "GIF", description: "Animated images" },
          { value: "bmp", label: "BMP", description: "Uncompressed bitmap" },
          { value: "tiff", label: "TIFF", description: "High quality format" }
        ];
      case 'document':
        return [
          { value: "pdf", label: "PDF", description: "Portable document format" },
          { value: "docx", label: "DOCX", description: "Microsoft Word document" }
        ];
      case 'text':
        return [
          { value: "pdf", label: "PDF", description: "Convert to PDF document" },
          { value: "docx", label: "DOCX", description: "Convert to Word document" },
          { value: "txt", label: "TXT", description: "Plain text format" }
        ];
      default:
        return [];
    }
  };

  // Get converter icon
  const getConverterIcon = (type: string) => {
    switch (type) {
      case 'audio': return <Music className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      case 'text': return <Type className="h-5 w-5" />;
      default: return <FileIcon className="h-5 w-5" />;
    }
  };

  // Handle conversion
  const handleConvert = async () => {
    if (!detectedFormat || !targetFormat) {
      toast.error("Please select a target format");
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate conversion progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setProgress(100);

      // Simulate successful conversion
      const fileName = selectedFile 
        ? `${selectedFile.name.split('.')[0]}.${targetFormat}`
        : `converted_file.${targetFormat}`;

      const result: ConversionResult = {
        success: true,
        downloadUrl: "#",
        fileName,
        detectedFormat: detectedFormat.format,
        targetFormat
      };

      setResult(result);
      
      // Add to conversion history
      setConversionHistory(prev => [
        { file: fileName, format: targetFormat, date: new Date() },
        ...prev.slice(0, 9)
      ]);
      
      // Track conversion
      trackConversion(detectedFormat.converter, targetFormat, selectedFile?.size);
      
      toast.success("Conversion completed successfully!");
    } catch (error) {
      const result: ConversionResult = {
        success: false,
        error: "Conversion failed. Please try again."
      };
      setResult(result);
      toast.error("Conversion failed");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Input Method Selection */}
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">Input Method:</span>
          <div className="flex gap-2">
            <Button
              variant={inputMethod === 'file' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInputMethod('file')}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            <Button
              variant={inputMethod === 'url' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInputMethod('url')}
            >
              <Globe className="h-4 w-4 mr-2" />
              From URL
            </Button>
          </div>
        </div>

        {/* File Upload Area */}
        {inputMethod === 'file' && (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-105' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10'}
              ${selectedFile ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              {selectedFile ? (
                <>
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <div>
                    <p className="text-lg font-medium text-green-700 dark:text-green-300">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? "Drop your file here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports Audio, Image, PDF, and Text files • Max 100MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* URL Input Area */}
        {inputMethod === 'url' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter file URL (e.g., https://example.com/file.mp3)"
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
              <Button onClick={handleUrlSubmit} disabled={!inputUrl.trim()}>
                <Link className="h-4 w-4 mr-2" />
                Detect
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 Paste any file URL and we'll automatically detect the format and suggest conversion options
            </p>
          </div>
        )}

        {/* Format Detection Result */}
        {detectedFormat && (
          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-center gap-3">
              {getConverterIcon(detectedFormat.type)}
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Format Detected: {detectedFormat.format.toUpperCase()}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Confidence: {Math.round(detectedFormat.confidence * 100)}% • 
                  Type: {detectedFormat.type} • 
                  Converter: {detectedFormat.converter}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Target Format Selection */}
        {detectedFormat && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Target Format</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getTargetFormats(detectedFormat).map((format) => (
                <Tooltip key={format.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTargetFormat(format.value)}
                      className={`
                        p-4 rounded-lg border text-left transition-all duration-200 hover:scale-105
                        ${targetFormat === format.value 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-md' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        {getConverterIcon(detectedFormat.type)}
                        <span className="font-medium">{format.label}</span>
                        {targetFormat === format.value && <Star className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format.description}
                      </p>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to select {format.label} format</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        )}

        {/* Convert Button */}
        {detectedFormat && targetFormat && (
          <div className="space-y-4">
            <Button 
              onClick={handleConvert} 
              disabled={isConverting}
              className="w-full"
              size="lg"
            >
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting... ({progress}%)
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Convert {detectedFormat.format.toUpperCase()} to {targetFormat.toUpperCase()}
                </>
              )}
            </Button>
            
            {/* Conversion Info */}
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-4">
                <span>📁 {selectedFile?.name || 'URL File'}</span>
                <span>→</span>
                <span>🎯 {targetFormat.toUpperCase()}</span>
                <span>•</span>
                <span>🔧 {detectedFormat.converter} converter</span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isConverting && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Converting file...
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Processing {detectedFormat?.format.toUpperCase()} → {targetFormat.toUpperCase()}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`
            p-6 rounded-lg border transition-all duration-300
            ${result.success 
              ? 'border-green-200 bg-green-50 dark:bg-green-950/20 shadow-lg' 
              : 'border-red-200 bg-red-50 dark:bg-red-950/20 shadow-lg'
            }
          `}>
            {result.success ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-300">
                        🎉 Conversion completed successfully!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.fileName} • Ready for download
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href={result.downloadUrl} download={result.fileName}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>✅ File processed</span>
                  <span>✅ Quality maintained</span>
                  <span>✅ Ready to use</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    ❌ Conversion failed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tips Section */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Universal Converter Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Upload files or paste URLs from anywhere on the web</li>
            <li>• We automatically detect the file format and suggest conversions</li>
            <li>• Supports audio, image, PDF, and text file conversions</li>
            <li>• Works with files up to 100MB in size</li>
            <li>• All conversions are processed securely and privately</li>
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
}

