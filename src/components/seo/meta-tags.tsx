import Head from "next/head";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export function MetaTags({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
  structuredData
}: MetaTagsProps) {
  const siteName = "ToolNest";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://toolnest.com";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}/og-image.png`;

  const defaultKeywords = [
    "online converter",
    "file converter",
    "audio converter",
    "image converter",
    "PDF converter",
    "text tools",
    "free converter",
    "MP3 converter",
    "JPG converter",
    "PDF to Word",
    "batch conversion",
    "file processing"
  ];

  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content="ToolNest" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Performance and Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="origin-when-cross-origin" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2)
          }}
        />
      )}
    </Head>
  );
}

// Predefined meta tags for common pages
export const audioConverterMeta = {
  title: "Free Audio Converter - MP3, WAV, M4A Online",
  description: "Convert audio files between MP3, WAV, M4A, FLAC, AAC, and OGG formats. High-quality audio conversion with advanced settings. Free, fast, and secure.",
  keywords: ["audio converter", "MP3 converter", "WAV converter", "M4A converter", "FLAC converter", "AAC converter", "OGG converter", "audio format converter"],
  canonicalUrl: "/tools/audio"
};

export const imageConverterMeta = {
  title: "Free Image Converter - PNG, JPG, WebP Online",
  description: "Convert images between PNG, JPG, WebP, GIF, BMP, and TIFF formats. Batch processing with quality control. Free, fast, and secure image conversion.",
  keywords: ["image converter", "PNG converter", "JPG converter", "WebP converter", "GIF converter", "BMP converter", "TIFF converter", "image format converter"],
  canonicalUrl: "/tools/image"
};

export const pdfConverterMeta = {
  title: "Free PDF Converter - PDF to Word, Word to PDF",
  description: "Convert PDF to Word (DOCX) and Word to PDF with perfect formatting. OCR support for scanned documents. Free, fast, and secure PDF conversion.",
  keywords: ["PDF converter", "PDF to Word", "Word to PDF", "PDF to DOCX", "DOCX to PDF", "PDF editor", "document converter"],
  canonicalUrl: "/tools/pdf"
};

export const textToolsMeta = {
  title: "Free Text Tools - Word Count, Case Converter, Text to PDF",
  description: "Word count, character count, case conversion, and text to PDF generation. Professional text analysis and formatting tools. Free and easy to use.",
  keywords: ["text tools", "word count", "character count", "case converter", "text to PDF", "text analysis", "text formatting"],
  canonicalUrl: "/tools/text"
};

