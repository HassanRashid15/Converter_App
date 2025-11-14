import { getConversionMeta } from '@/components/tools/conversion-map';
import { AudioConverter } from '@/components/tools/audio-converter';
import { ImageConverter } from '@/components/tools/image-converter';
import { PDFConverter } from '@/components/tools/pdf-converter';
import { TextTools } from '@/components/tools/text-tools';
import { UniversalConverter } from '@/components/tools/universal-converter';
import { VideoToAudioConverter } from '@/components/tools/video-to-audio-converter';

export default function DynamicConverterPage({ params }: { params: { id: string } }) {
  const meta = getConversionMeta(params.id);

  // Check if this is a video-to-audio conversion
  const isVideoToAudio = meta?.category === 'video' && 
    (meta.id.includes('-mp3') || meta.id.includes('-wav') || meta.id.includes('-m4a') || 
     meta.id.includes('-flac') || meta.id.includes('-aac') || meta.id.includes('-ogg'));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {meta ? `${meta.from} → ${meta.to} Converter` : 'Converter'}
          </h1>
          {meta && (
            <p className="text-muted-foreground mt-2">{meta.description}</p>
          )}
        </div>

        {!meta && (
          <UniversalConverter />
        )}

        {meta?.category === 'audio' && <AudioConverter />}
        {meta?.category === 'image' && <ImageConverter />}
        {meta?.category === 'document' && <PDFConverter />}
        
        {/* Video to Audio conversions */}
        {isVideoToAudio && <VideoToAudioConverter />}

        {/* Fallback to Universal for other video conversions */}
        {meta?.category === 'video' && !isVideoToAudio && (
          <UniversalConverter />
        )}

        {/* Fallback to Universal for archive and code */}
        {(meta?.category === 'archive' || meta?.category === 'code') && (
          <UniversalConverter />
        )}
      </div>
    </div>
  );
}
