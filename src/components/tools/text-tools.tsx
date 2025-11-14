"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Type, 
  FileText, 
  Download,
  Copy,
  RotateCcw,
  Hash,
  Clock
} from "lucide-react";
import { toast } from "react-hot-toast";

export function TextTools() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const handleTextChange = (value: string) => {
    setText(value);
    
    // Calculate word count
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    // Calculate character counts
    setCharCount(value.length);
    setCharCountNoSpaces(value.replace(/\s/g, '').length);
    
    // Calculate reading time (average 200 words per minute)
    setReadingTime(Math.ceil(words.length / 200));
  };

  const transformText = (transform: (text: string) => string) => {
    const transformed = transform(text);
    setText(transformed);
    toast.success("Text transformed!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  const clearText = () => {
    setText("");
    toast.success("Text cleared!");
  };

  const downloadAsPDF = () => {
    // In a real implementation, this would generate and download a PDF
    toast.success("PDF download started!");
  };

  const textTransforms = [
    {
      name: "Uppercase",
      icon: <Type className="h-4 w-4" />,
      action: () => transformText(text => text.toUpperCase())
    },
    {
      name: "Lowercase", 
      icon: <Type className="h-4 w-4" />,
      action: () => transformText(text => text.toLowerCase())
    },
    {
      name: "Title Case",
      icon: <Type className="h-4 w-4" />,
      action: () => transformText(text => 
        text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      )
    },
    {
      name: "Sentence Case",
      icon: <Type className="h-4 w-4" />,
      action: () => transformText(text => 
        text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (txt) => 
          txt.toUpperCase()
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enter Your Text</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!text}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearText}
              disabled={!text}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Text Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border bg-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Hash className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{wordCount}</p>
          <p className="text-sm text-muted-foreground">Words</p>
        </div>
        <div className="p-4 rounded-lg border bg-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Type className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{charCount}</p>
          <p className="text-sm text-muted-foreground">Characters</p>
        </div>
        <div className="p-4 rounded-lg border bg-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Type className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{charCountNoSpaces}</p>
          <p className="text-sm text-muted-foreground">No Spaces</p>
        </div>
        <div className="p-4 rounded-lg border bg-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">{readingTime}</p>
          <p className="text-sm text-muted-foreground">Min Read</p>
        </div>
      </div>

      {/* Text Transformations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transform Text</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {textTransforms.map((transform, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={transform.action}
              disabled={!text}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              {transform.icon}
              <span className="text-sm">{transform.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Export Options</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={downloadAsPDF}
            disabled={!text}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Download as PDF</span>
          </Button>
          <Button
            variant="outline"
            onClick={copyToClipboard}
            disabled={!text}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Copy to Clipboard</span>
          </Button>
        </div>
      </div>

      {/* Additional Tools */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="font-medium mb-2">Text Analysis</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get insights about your text including readability and complexity.
            </p>
            <Button variant="outline" size="sm" disabled={!text}>
              Analyze Text
            </Button>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h4 className="font-medium mb-2">Text Summarizer</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Generate a summary of your text using AI-powered algorithms.
            </p>
            <Button variant="outline" size="sm" disabled={!text}>
              Summarize
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


