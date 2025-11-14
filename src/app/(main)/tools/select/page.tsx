"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConverterSelector } from "@/components/tools/converter-selector";
import { UniversalConverter } from "@/components/tools/universal-converter";
import { AudioConverter } from "@/components/tools/audio-converter";
import { ImageConverter } from "@/components/tools/image-converter";
import { PDFConverter } from "@/components/tools/pdf-converter";
import { TextTools } from "@/components/tools/text-tools";

export default function ConverterSelectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConverter, setSelectedConverter] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(true);

  useEffect(() => {
    // Check if a specific converter was requested via URL
    const converter = searchParams.get('converter');
    if (converter) {
      setSelectedConverter(converter);
      setShowSelector(false);
    }
  }, [searchParams]);

  const handleSelectConverter = (converterId: string) => {
    setSelectedConverter(converterId);
    setShowSelector(false);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('converter', converterId);
    window.history.pushState({}, '', url.toString());
  };

  const handleBackToSelector = () => {
    setSelectedConverter(null);
    setShowSelector(true);
    
    // Remove converter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('converter');
    window.history.pushState({}, '', url.toString());
  };

  const renderConverter = () => {
    switch (selectedConverter) {
      case 'universal':
        return <UniversalConverter />;
      case 'audio':
        return <AudioConverter />;
      case 'image':
        return <ImageConverter />;
      case 'pdf':
        return <PDFConverter />;
      case 'text':
        return <TextTools />;
      default:
        return null;
    }
  };

  if (showSelector) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ConverterSelector 
            onSelectConverter={handleSelectConverter}
            showUniversalOption={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToSelector}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Converter Selection
        </button>

        {/* Selected Converter */}
        {renderConverter()}
      </div>
    </div>
  );
}

