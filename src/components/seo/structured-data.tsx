import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  type: 'WebSite' | 'WebApplication' | 'SoftwareApplication';
  name?: string;
  description?: string;
  url?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export function StructuredData({ 
  type, 
  name = siteConfig.name, 
  description = siteConfig.description,
  url = siteConfig.url,
  applicationCategory = "MultimediaApplication",
  operatingSystem = "Web Browser",
  offers
}: StructuredDataProps) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "ToolNest",
      "url": url
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolNest",
      "url": url,
      "logo": {
        "@type": "ImageObject",
        "url": `${url}/logo.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  if (offers) {
    (baseStructuredData as any).offers = {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseStructuredData, null, 2)
      }}
    />
  );
}

export function ToolStructuredData({ 
  toolName, 
  toolDescription, 
  toolUrl,
  supportedFormats 
}: {
  toolName: string;
  toolDescription: string;
  toolUrl: string;
  supportedFormats: string[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${toolName} - ${siteConfig.name}`,
    "description": toolDescription,
    "url": toolUrl,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "featureList": supportedFormats.map(format => `Convert to ${format.toUpperCase()}`),
    "screenshot": `${siteConfig.url}/screenshots/${toolName.toLowerCase()}.png`,
    "author": {
      "@type": "Organization",
      "name": "ToolNest"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}

