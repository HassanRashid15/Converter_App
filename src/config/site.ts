type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const siteConfig: SiteConfig = {
  name: "ToolNest",
  description:
    "Convert, Create, Compress — Smarter Tools for Everyday Use. Free online converters for audio, images, PDFs, and text. All-in-one platform for your digital needs.",
  url: baseUrl,
  ogImage: `${baseUrl}/open-graph.png`,
  links: {
    twitter: "https://twitter.com/ToolNest",
    github: "https://github.com/ToolNest",
  },
};
