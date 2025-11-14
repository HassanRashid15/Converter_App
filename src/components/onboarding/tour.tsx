"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Upload,
  Settings,
  Download,
  Zap
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

interface TourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

export function Tour({ steps, onComplete, onSkip }: TourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('toolnest-tour-completed');
    if (!hasSeenTour) {
      setIsVisible(true);
      updateTargetElement();
    }
  }, []);

  useEffect(() => {
    updateTargetElement();
  }, [currentStep]);

  const updateTargetElement = () => {
    const target = document.querySelector(steps[currentStep]?.target);
    setTargetElement(target as HTMLElement);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    localStorage.setItem('toolnest-tour-completed', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  const skipTour = () => {
    localStorage.setItem('toolnest-tour-completed', 'true');
    setIsVisible(false);
    onSkip?.();
  };

  if (!isVisible || !targetElement || !steps[currentStep]) {
    return null;
  }

  const step = steps[currentStep];
  const rect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const getTooltipPosition = () => {
    const offset = 20;
    let top = rect.top + scrollTop;
    let left = rect.left + scrollLeft;

    switch (step.position) {
      case 'top':
        top = rect.top + scrollTop - offset;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + offset;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.left + scrollLeft - offset;
        break;
      case 'right':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.right + scrollLeft + offset;
        break;
    }

    return { top, left };
  };

  const position = getTooltipPosition();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Highlight */}
      <div
        className="fixed z-50 border-2 border-blue-500 rounded-lg pointer-events-none"
        style={{
          top: rect.top + scrollTop - 4,
          left: rect.left + scrollLeft - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border max-w-sm p-6"
        style={{
          top: position.top,
          left: position.left,
          transform: step.position === 'top' || step.position === 'bottom' 
            ? 'translateX(-50%)' 
            : step.position === 'left' 
            ? 'translateX(-100%)' 
            : 'translateX(0)',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {step.icon}
            <div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={skipTour}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {step.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep 
                    ? 'bg-blue-500' 
                    : index < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button onClick={nextStep} size="sm">
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Predefined tour steps for audio converter
export const audioConverterTourSteps: TourStep[] = [
  {
    id: 'upload',
    title: 'Upload Your File',
    description: 'Click here or drag and drop your audio file to get started. We support MP3, WAV, M4A, FLAC, AAC, and OGG formats.',
    target: '[data-tour="upload-area"]',
    position: 'bottom',
    icon: <Upload className="h-5 w-5 text-blue-500" />
  },
  {
    id: 'format',
    title: 'Choose Output Format',
    description: 'Select your desired output format. Use keyboard shortcuts Ctrl+1/2/3 for quick selection.',
    target: '[data-tour="format-selection"]',
    position: 'bottom',
    icon: <Settings className="h-5 w-5 text-green-500" />
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    description: 'Click here to access advanced audio settings like bitrate and sample rate for professional quality.',
    target: '[data-tour="advanced-settings"]',
    position: 'left',
    icon: <Settings className="h-5 w-5 text-purple-500" />
  },
  {
    id: 'convert',
    title: 'Convert Your File',
    description: 'Click here to start the conversion process. You can also use Ctrl+Enter as a shortcut.',
    target: '[data-tour="convert-button"]',
    position: 'top',
    icon: <Zap className="h-5 w-5 text-yellow-500" />
  },
  {
    id: 'download',
    title: 'Download Result',
    description: 'Once conversion is complete, click here to download your converted file.',
    target: '[data-tour="download-button"]',
    position: 'top',
    icon: <Download className="h-5 w-5 text-green-500" />
  }
];

