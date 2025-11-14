"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  FileText, 
  File, 
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

export function PDFConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<string>("pdf-to-docx");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check file type based on conversion type
      const isValidFile = conversionType === "pdf-to-docx" 
        ? file.type === "application/pdf"
        : file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      
      if (isValidFile) {
        setSelectedFile(file);
        setResult(null);
        toast.success(`Selected: ${file.name}`);
      } else {
        const expectedType = conversionType === "pdf-to-docx" ? "PDF" : "DOCX";
        toast.error(`Please select a ${expectedType} file`);
      }
    }
  }, [conversionType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: conversionType === "pdf-to-docx" 
      ? { 'application/pdf': ['.pdf'] }
      : { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
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
        fileName: conversionType === "pdf-to-docx" 
          ? `${selectedFile.name.split('.')[0]}.docx`
          : `${selectedFile.name.split('.')[0]}.pdf`
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

  const conversionTypes = [
    { 
      value: "pdf-to-docx", 
      label: "PDF to DOCX", 
      description: "Convert PDF to editable Word document",
      icon: <FileText className="h-5 w-5" />
    },
    { 
      value: "docx-to-pdf", 
      label: "DOCX to PDF", 
      description: "Convert Word document to PDF",
      icon: <File className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Conversion Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Conversion Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setConversionType(type.value);
                setSelectedFile(null);
                setResult(null);
              }}
              className={`
                p-6 rounded-lg border text-left transition-colors
                ${conversionType === type.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                {type.icon}
                <span className="font-medium text-lg">{type.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>

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
                  {isDragActive ? "Drop your file here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {conversionType === "pdf-to-docx" 
                    ? "Supports PDF files" 
                    : "Supports DOCX files"
                  }
                </p>
              </div>
            </>
          )}
        </div>
      </div>

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
              <FileText className="mr-2 h-4 w-4" />
              Convert {conversionType === "pdf-to-docx" ? "PDF to DOCX" : "DOCX to PDF"}
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


