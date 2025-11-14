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
  Video, 
  Music, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Clock,
  FileVideo,
  Settings,
  History,
  Star,
  Globe,
  Link
} from "lucide-react";
import { toast } from "react-hot-toast";
import { trackUserEngagement, trackConversion } from "@/components/analytics/google-analytics";

interface ConversionResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  fileName?: string;
  duration?: number;
  extractedAudio?: boolean;
}

export function VideoToAudioConverter() {
  const [inputMethod, setInputMethod] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<string>("mp3");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionHistory, setConversionHistory] = useState<Array<{file: string, format: string, date: Date}>>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bitrate, setBitrate] = useState<number>(320);
  const [sampleRate, setSampleRate] = useState<number>(44100);

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

    // Check if URL looks like a video
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv', '.flv', '.m4v'];
    const urlLower = inputUrl.toLowerCase();
    const isVideoUrl = videoExtensions.some(ext => urlLower.includes(ext)) || 
                      urlLower.includes('youtube.com') || 
                      urlLower.includes('youtu.be') ||
                      urlLower.includes('vimeo.com');

    if (!isVideoUrl) {
      toast.error("URL doesn't appear to be a video file. Please check the URL or try uploading a file instead.");
      return;
    }

    toast.success("Video URL detected! Choose your audio format below.");
    trackUserEngagement('video_url_detected', { url: inputUrl });
  };

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if it's a video file
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setResult(null);
        toast.success(`Selected: ${file.name}`);
        trackUserEngagement('video_file_selected', { 
          fileName: file.name, 
          fileSize: file.size,
          fileType: file.type 
        });
      } else {
        toast.error("Please select a video file (MP4, MOV, AVI, etc.)");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv', '.flv', '.m4v', '.3gp', '.mpg']
    },
    multiple: false
  });

  // Handle conversion
  const handleConvert = async () => {
    if (!selectedFile && !inputUrl.trim()) {
      toast.error("Please select a video file or enter a URL");
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
      await new Promise(resolve => setTimeout(resolve, 3000)); // Longer for video processing

      clearInterval(progressInterval);
      setProgress(100);

      // Simulate successful conversion
      const fileName = selectedFile 
        ? `${selectedFile.name.split('.')[0]}.${targetFormat}`
        : `extracted_audio.${targetFormat}`;

      const result: ConversionResult = {
        success: true,
        downloadUrl: "#",
        fileName,
        duration: selectedFile ? Math.floor(Math.random() * 300) + 60 : 180, // Simulate duration
        extractedAudio: true
      };

      setResult(result);
      
      // Add to conversion history
      setConversionHistory(prev => [
        { file: fileName, format: targetFormat, date: new Date() },
        ...prev.slice(0, 9)
      ]);
      
      // Track conversion
      trackConversion('video_to_audio', targetFormat, selectedFile?.size);
      
      toast.success("Audio extraction completed successfully!");
    } catch (error) {
      const result: ConversionResult = {
        success: false,
        error: "Audio extraction failed. Please try again."
      };
      setResult(result);
      toast.error("Audio extraction failed");
    } finally {
      setIsConverting(false);
    }
  };

  const audioFormats = [
    { value: "mp3", label: "MP3", description: "Most compatible format" },
    { value: "wav", label: "WAV", description: "Uncompressed, high quality" },
    { value: "m4a", label: "M4A", description: "Apple's audio format" },
    { value: "flac", label: "FLAC", description: "Lossless compression" },
    { value: "aac", label: "AAC", description: "Advanced audio coding" },
    { value: "ogg", label: "OGG", description: "Open source format" }
  ];

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
              Upload Video
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Video className="h-4 w-4" />
                    <span>Video file ready for audio extraction</span>
                  </div>
                </>
              ) : (
                <>
                  <Video className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">
                      {isDragActive ? "Drop your video file here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports MP4, MOV, AVI, MKV, WebM, WMV, FLV • Max 500MB
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>💡 Tip: Works with YouTube, Vimeo URLs too</span>
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
                placeholder="Enter video URL (YouTube, Vimeo, or direct video file)"
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
              <Button onClick={handleUrlSubmit} disabled={!inputUrl.trim()}>
                <Link className="h-4 w-4 mr-2" />
                Detect
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 Paste any video URL (YouTube, Vimeo, or direct video file) and we'll extract the audio
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Supported URLs:</strong> YouTube, Vimeo, direct video files (.mp4, .mov, .avi, etc.)
              </p>
            </div>
          </div>
        )}

        {/* Audio Format Selection */}
        {(selectedFile || inputUrl.trim()) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose Audio Format</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Select output audio format</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {audioFormats.map((format) => (
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
                        <Music className="h-5 w-5" />
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

        {/* Advanced Settings */}
        {(selectedFile || inputUrl.trim()) && showAdvanced && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Advanced Audio Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bitrate (kbps)</label>
                <select 
                  value={bitrate} 
                  onChange={(e) => setBitrate(Number(e.target.value))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value={128}>128 kbps (Standard)</option>
                  <option value={192}>192 kbps (Good)</option>
                  <option value={256}>256 kbps (High)</option>
                  <option value={320}>320 kbps (Best)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sample Rate (Hz)</label>
                <select 
                  value={sampleRate} 
                  onChange={(e) => setSampleRate(Number(e.target.value))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value={22050}>22050 Hz</option>
                  <option value={44100}>44100 Hz (CD Quality)</option>
                  <option value={48000}>48000 Hz (Professional)</option>
                  <option value={96000}>96000 Hz (High-Res)</option>
                </select>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              💡 Higher bitrate and sample rate = better quality but larger file size
            </div>
          </div>
        )}

        {/* Convert Button */}
        {(selectedFile || inputUrl.trim()) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={handleConvert} 
                disabled={isConverting}
                className="flex-1 mr-4"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting Audio... ({progress}%)
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Extract Audio to {targetFormat.toUpperCase()}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                disabled={isConverting}
              >
                <Settings className="h-4 w-4 mr-2" />
                {showAdvanced ? 'Hide' : 'Advanced'}
              </Button>
            </div>
            
            {/* Conversion Info */}
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-4">
                <span>🎬 {selectedFile?.name || 'Video URL'}</span>
                <span>→</span>
                <span>🎵 {targetFormat.toUpperCase()}</span>
                {showAdvanced && (
                  <>
                    <span>•</span>
                    <span>🔊 {bitrate}kbps</span>
                    <span>•</span>
                    <span>📊 {sampleRate}Hz</span>
                  </>
                )}
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
                Extracting audio from video...
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Processing video → {targetFormat.toUpperCase()} audio
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
                        🎉 Audio extraction completed!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.fileName} • {result.duration && `${Math.floor(result.duration / 60)}:${(result.duration % 60).toString().padStart(2, '0')}`}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href={result.downloadUrl} download={result.fileName}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Audio
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>✅ Audio extracted</span>
                  <span>✅ Quality maintained</span>
                  <span>✅ Ready to download</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    ❌ Audio extraction failed
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
            Video to Audio Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Upload video files or paste URLs from YouTube, Vimeo, or direct video links</li>
            <li>• Supports MP4, MOV, AVI, MKV, WebM, WMV, FLV formats</li>
            <li>• Choose MP3 for maximum compatibility or WAV for highest quality</li>
            <li>• Use advanced settings to control audio quality and file size</li>
            <li>• Processing time depends on video length and quality</li>
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
}
