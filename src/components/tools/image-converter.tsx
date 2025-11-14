"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  Image, 
  FileImage, 
  Loader2,
  CheckCircle,
  AlertCircle 
} from "lucide-react";
import { toast } from "react-hot-toast";

interface ConversionResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  fileName?: string;
}

export function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("jpg");
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null);
        toast.success(`Selected: ${file.name}`);
      } else {
        toast.error("Please select an image file");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff']
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
    { value: "jpg", label: "JPG", description: "Most compatible format" },
    { value: "png", label: "PNG", description: "Lossless with transparency" },
    { value: "webp", label: "WebP", description: "Modern, efficient format" },
    { value: "gif", label: "GIF", description: "Animated images" },
    { value: "bmp", label: "BMP", description: "Uncompressed bitmap" },
    { value: "tiff", label: "TIFF", description: "High quality format" }
  ];

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-300 dark:border-gray-700'}
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
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your image file here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PNG, JPG, WebP, GIF, BMP, TIFF
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Format Selection */}
      {selectedFile && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Choose Output Format</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {supportedFormats.map((format) => (
              <button
                key={format.value}
                onClick={() => setTargetFormat(format.value)}
                className={`
                  p-4 rounded-lg border text-left transition-colors
                  ${targetFormat === format.value 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <FileImage className="h-5 w-5" />
                  <span className="font-medium">{format.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {format.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quality Settings */}
      {selectedFile && (targetFormat === "jpg" || targetFormat === "webp") && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quality Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quality: {quality}%</span>
              <span className="text-muted-foreground">
                {quality >= 90 ? "High" : quality >= 70 ? "Medium" : "Low"}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>
        </div>
      )}

      {/* Convert Button */}
      {selectedFile && (
        <Button 
          onClick={handleConvert} 
          disabled={isConverting}
          className="w-full"
          size="lg"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Image className="mr-2 h-4 w-4" />
              Convert to {targetFormat.toUpperCase()}
            </>
          )}
        </Button>
      )}

      {/* Progress Bar */}
      {isConverting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Converting...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`
          p-6 rounded-lg border
          ${result.success 
            ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
            : 'border-red-200 bg-red-50 dark:bg-red-950/20'
          }
        `}>
          {result.success ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    Conversion completed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {result.fileName}
                  </p>
                </div>
              </div>
              <Button asChild>
                <a href={result.downloadUrl} download={result.fileName}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-300">
                  Conversion failed
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.error}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


