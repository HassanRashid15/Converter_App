import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  Music, 
  Image, 
  FileText, 
  Type, 
  Zap, 
  Shield, 
  Clock, 
  Download,
  Globe,
  Video,
  Archive,
  Code,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Smart Tools",
  description: "Complete collection of converters: Audio, Video, Image, Document, Archive, and Code formats",
};

const converterCategories = [
  {
    name: "Audio Converters",
    description: "Convert between different audio formats with high quality output",
    className: "md:col-span-2",
    Icon: Music,
    href: "/tools/select?converter=audio",
    cta: "Convert Audio",
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20" />,
    conversions: [
      "MP3 ⇄ WAV", "MP3 ⇄ AAC", "MP3 ⇄ OGG", "MP3 ⇄ FLAC",
      "WAV ⇄ FLAC", "M4A ⇄ MP3", "AIFF ⇄ MP3", "WMA ⇄ MP3",
      "OGG ⇄ AAC", "AMR ⇄ MP3"
    ]
  },
  {
    name: "Video Converters", 
    description: "Convert video formats and extract audio from videos",
    className: "md:col-span-2",
    Icon: Video,
    href: "/tools/select?converter=video",
    cta: "Convert Video",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20" />,
    conversions: [
      "MP4 ⇄ MOV", "MP4 ⇄ AVI", "MP4 ⇄ MKV", "MP4 ⇄ WEBM",
      "MP4 ⇄ WMV", "AVI ⇄ MKV", "FLV ⇄ MP4", "3GP ⇄ MP4",
      "M4V ⇄ MP4", "MPG ⇄ MP4", "MP4 → MP3", "MP4 → WAV"
    ]
  },
  {
    name: "Image Converters",
    description: "Transform images between formats with compression options",
    className: "md:col-span-2", 
    Icon: Image,
    href: "/tools/select?converter=image",
    cta: "Convert Images",
    background: <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20" />,
    conversions: [
      "JPG ⇄ PNG", "JPG ⇄ WEBP", "JPG ⇄ SVG", "PNG ⇄ WEBP",
      "PNG ⇄ BMP", "PNG ⇄ TIFF", "HEIC ⇄ JPG", "SVG ⇄ PNG",
      "GIF ⇄ MP4", "BMP ⇄ JPG"
    ]
  },
  {
    name: "Document Converters",
    description: "Convert text and document formats with perfect formatting",
    className: "md:col-span-2",
    Icon: FileText,
    href: "/tools/select?converter=document", 
    cta: "Convert Documents",
    background: <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20" />,
    conversions: [
      "DOCX ⇄ PDF", "DOCX ⇄ TXT", "DOC ⇄ RTF", "PDF ⇄ PPTX",
      "PDF ⇄ XLSX", "PDF ⇄ TXT", "PPTX ⇄ PDF", "XLSX ⇄ CSV",
      "TXT ⇄ PDF", "ODT ⇄ DOCX"
    ]
  },
  {
    name: "Archive Converters",
    description: "Convert compressed file formats and archives",
    className: "md:col-span-2",
    Icon: Archive,
    href: "/tools/select?converter=archive",
    cta: "Convert Archives", 
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20" />,
    conversions: [
      "ZIP ⇄ RAR", "7Z ⇄ ZIP", "TAR ⇄ ZIP", "ISO ⇄ ZIP"
    ]
  },
  {
    name: "Code Converters",
    description: "Convert data formats for developers and programmers",
    className: "md:col-span-2",
    Icon: Code,
    href: "/tools/select?converter=code",
    cta: "Convert Code",
    background: <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-950/20 dark:to-green-950/20" />,
    conversions: [
      "JSON ⇄ CSV", "JSON ⇄ XML", "CSV ⇄ XLSX", "YAML ⇄ JSON",
      "HTML ⇄ Markdown", "Markdown ⇄ PDF"
    ]
  }
];

const features = [
  {
    title: "Lightning Fast",
    description: "Process files in seconds with our optimized conversion engine.",
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
  },
  {
    title: "Secure & Private",
    description: "Files are processed locally and deleted immediately after conversion.",
    icon: <Shield className="h-6 w-6 text-green-500" />,
  },
  {
    title: "No Registration",
    description: "Start converting immediately without creating an account.",
    icon: <Clock className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Free Forever",
    description: "All basic tools are completely free with no hidden costs.",
    icon: <Download className="h-6 w-6 text-purple-500" />,
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          All Smart Tools <span className="text-blue-600">in One Place</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete collection of converters for Audio, Video, Image, Document, Archive, and Code formats. 
          Fast, secure, and completely free.
        </p>
      </div>

      {/* Universal Converter */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Universal Converter</h2>
          <p className="text-muted-foreground">Convert any file format - upload files or paste URLs from anywhere</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <BentoCard
            name="Universal Converter"
            description="Convert any file format - upload files or paste URLs from anywhere"
            className="md:col-span-2"
            Icon={Globe}
            href="/tools/universal"
            cta="Try Universal Converter"
            background={<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />}
          />
        </div>
      </div>

      {/* Converter Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Converter Categories</h2>
        <BentoGrid className="max-w-6xl mx-auto">
          {converterCategories.map((category, i) => (
            <BentoCard
              key={i}
              name={category.name}
              description={category.description}
              className={category.className}
              Icon={category.Icon}
              href={category.href}
              cta={category.cta}
              background={category.background}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Conversion Examples */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Available Conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {converterCategories.map((category, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center mb-4">
                <category.Icon className="h-6 w-6 mr-3 text-blue-500" />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className="space-y-2">
                {category.conversions.slice(0, 6).map((conversion, j) => (
                  <div key={j} className="text-sm text-muted-foreground">
                    {conversion}
                  </div>
                ))}
                {category.conversions.length > 6 && (
                  <div className="text-sm text-blue-500 font-medium">
                    +{category.conversions.length - 6} more...
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link 
                  href={category.href}
                  className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Why Choose ToolNest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="text-center p-6 rounded-lg border bg-card">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of users who trust ToolNest for their daily conversion needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/tools/universal" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Try Universal Converter
          </Link>
          <Link 
            href="/tools/select" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

