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
  Music, 
  FileAudio, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Clock,
  FileText,
  Settings,
  History,
  Star
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Tour, audioConverterTourSteps } from "@/components/onboarding/tour";
import { trackUserEngagement, trackConversion } from "@/components/analytics/google-analytics";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";

interface ConversionResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  fileName?: string;
}

export function AudioConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("mp3");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionHistory, setConversionHistory] = useState<Array<{file: string, format: string, date: Date}>>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bitrate, setBitrate] = useState<number>(320);
  const [sampleRate, setSampleRate] = useState<number>(44100);
  const [advancedModalOpen, setAdvancedModalOpen] = useState(false);
  const [advancedFrom, setAdvancedFrom] = useState<string>("mp3");
  const [advancedTo, setAdvancedTo] = useState<string>("wav");

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'o':
            event.preventDefault();
            document.getElementById('file-upload')?.click();
            break;
          case 'Enter':
            if (selectedFile && !isConverting) {
              event.preventDefault();
              handleConvert();
            }
            break;
          case '1':
            event.preventDefault();
            setTargetFormat('mp3');
            break;
          case '2':
            event.preventDefault();
            setTargetFormat('wav');
            break;
          case '3':
            event.preventDefault();
            setTargetFormat('m4a');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedFile, isConverting]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if it's an audio file
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        setResult(null);
        toast.success(`Selected: ${file.name}`);
      } else {
        toast.error("Please select an audio file");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.aac', '.ogg']
    },
    multiple: false
  });

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
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
      const result: ConversionResult = {
        success: true,
        downloadUrl: "#", // In real implementation, this would be the actual download URL
        fileName: `${selectedFile.name.split('.')[0]}.${targetFormat}`
      };

      setResult(result);
      
      // Add to conversion history
      setConversionHistory(prev => [
        { file: selectedFile.name, format: targetFormat, date: new Date() },
        ...prev.slice(0, 9) // Keep only last 10 conversions
      ]);
      
      // Track conversion
      trackConversion('audio', targetFormat, selectedFile.size);
      
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

  const supportedFormats = [
    { value: "mp3", label: "MP3", description: "Most compatible format" },
    { value: "wav", label: "WAV", description: "Uncompressed, high quality" },
    { value: "m4a", label: "M4A", description: "Apple's audio format" },
    { value: "flac", label: "FLAC", description: "Lossless compression" },
    { value: "aac", label: "AAC", description: "Advanced audio coding" },
    { value: "ogg", label: "OGG", description: "Open source format" }
  ];

  return (
    <TooltipProvider>
      <Tour 
        steps={audioConverterTourSteps}
        onComplete={() => trackUserEngagement('tour_completed', { tool: 'audio_converter' })}
        onSkip={() => trackUserEngagement('tour_skipped', { tool: 'audio_converter' })}
      />
      <div className="space-y-6">
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Quick Actions:</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Open File (Ctrl+O)
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open file dialog or use Ctrl+O</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  data-tour="advanced-settings"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show advanced audio settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setAdvancedModalOpen(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Choose Conversion
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pick From/To and open dedicated page</p>
              </TooltipContent>
            </Tooltip>
            {conversionHistory.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    History ({conversionHistory.length})
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Recent Conversions:</p>
                    {conversionHistory.slice(0, 3).map((item, i) => (
                      <p key={i} className="text-xs">
                        {item.file} → {item.format.toUpperCase()}
                      </p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* File Upload Area */}
        <div
          {...getRootProps()}
          data-tour="upload-area"
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-105' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10'}
            ${selectedFile ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''}
          `}
        >
          <input {...getInputProps()} id="file-upload" />
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
                  <Clock className="h-4 w-4" />
                  <span>Estimated conversion time: ~{Math.ceil(selectedFile.size / 1024 / 1024 * 2)}s</span>
                </div>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? "Drop your audio file here" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP3, WAV, M4A, FLAC, AAC, OGG • Max 100MB
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>💡 Tip: Use Ctrl+O to open files quickly</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Format Selection */}
        {selectedFile && (
          <div className="space-y-4" data-tour="format-selection">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose Output Format</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Use Ctrl+1/2/3 for quick format selection</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {supportedFormats.map((format) => (
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
                        <FileAudio className="h-5 w-5" />
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
        {selectedFile && showAdvanced && (
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
        {selectedFile && (
          <div className="space-y-4">
            <Button 
              onClick={handleConvert} 
              disabled={isConverting}
              className="w-full"
              size="lg"
              data-tour="convert-button"
            >
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting... ({progress}%)
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Convert to {targetFormat.toUpperCase()} (Ctrl+Enter)
                </>
              )}
            </Button>
            
            {/* Conversion Info */}
            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-4">
                <span>📁 {selectedFile.name}</span>
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
                Converting audio...
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Processing {selectedFile?.name} → {targetFormat.toUpperCase()}
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
                  <Button asChild className="bg-green-600 hover:bg-green-700" data-tour="download-button">
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
            Pro Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use <kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-xs">Ctrl+O</kbd> to quickly open files</li>
            <li>• Press <kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-xs">Ctrl+Enter</kbd> to start conversion</li>
            <li>• Use <kbd className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-xs">Ctrl+1/2/3</kbd> for quick format selection</li>
            <li>• Enable advanced settings for professional audio quality</li>
          </ul>
        </div>
      </div>

      {/* Advanced Convert Modal */}
      <Modal
        open={advancedModalOpen}
        onClose={() => setAdvancedModalOpen(false)}
        title="Choose Conversion"
        footer={
          <>
            <Button variant="outline" onClick={() => setAdvancedModalOpen(false)}>Cancel</Button>
            <Link href={`/tools/convert/${advancedFrom}-${advancedTo}`}>
              <Button>
                Go to {advancedFrom.toUpperCase()} → {advancedTo.toUpperCase()}
              </Button>
            </Link>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <select
              value={advancedFrom}
              onChange={(e) => setAdvancedFrom(e.target.value)}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="mp3">MP3</option>
              <option value="wav">WAV</option>
              <option value="m4a">M4A</option>
              <option value="flac">FLAC</option>
              <option value="aac">AAC</option>
              <option value="ogg">OGG</option>
              <option value="aiff">AIFF</option>
              <option value="wma">WMA</option>
              <option value="amr">AMR</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <select
              value={advancedTo}
              onChange={(e) => setAdvancedTo(e.target.value)}
              className="w-full p-2 border rounded-md bg-background"
            >
              <option value="mp3">MP3</option>
              <option value="wav">WAV</option>
              <option value="m4a">M4A</option>
              <option value="flac">FLAC</option>
              <option value="aac">AAC</option>
              <option value="ogg">OGG</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">You will be taken to the dedicated converter page for this pair.</p>
      </Modal>
    </TooltipProvider>
  );
}

