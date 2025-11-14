export type ConverterCategory = 'audio' | 'image' | 'document' | 'video' | 'archive' | 'code';

export type ConversionMeta = {
  id: string;
  from: string;
  to: string;
  category: ConverterCategory;
  title: string;
  description: string;
};

export const conversionMap: Record<string, ConversionMeta> = {
  // Audio
  'mp3-wav': {
    id: 'mp3-wav',
    from: 'MP3',
    to: 'WAV',
    category: 'audio',
    title: 'MP3 to WAV Converter',
    description: 'Convert MP3 to high-quality WAV audio.'
  },
  'mp3-aac': {
    id: 'mp3-aac',
    from: 'MP3',
    to: 'AAC',
    category: 'audio',
    title: 'MP3 to AAC Converter',
    description: 'Convert MP3 to AAC format.'
  },
  'mp3-ogg': {
    id: 'mp3-ogg',
    from: 'MP3',
    to: 'OGG',
    category: 'audio',
    title: 'MP3 to OGG Converter',
    description: 'Convert MP3 to OGG (open source) format.'
  },
  'mp3-flac': {
    id: 'mp3-flac',
    from: 'MP3',
    to: 'FLAC',
    category: 'audio',
    title: 'MP3 to FLAC Converter',
    description: 'Convert MP3 to lossless FLAC format.'
  },
  'wav-flac': {
    id: 'wav-flac',
    from: 'WAV',
    to: 'FLAC',
    category: 'audio',
    title: 'WAV to FLAC Converter',
    description: 'Convert uncompressed WAV to lossless FLAC.'
  },
  'm4a-mp3': {
    id: 'm4a-mp3',
    from: 'M4A',
    to: 'MP3',
    category: 'audio',
    title: 'M4A to MP3 Converter',
    description: 'Convert Apple M4A audio to MP3.'
  },
  'aiff-mp3': {
    id: 'aiff-mp3',
    from: 'AIFF',
    to: 'MP3',
    category: 'audio',
    title: 'AIFF to MP3 Converter',
    description: 'Convert AIFF audio to MP3.'
  },
  'wma-mp3': {
    id: 'wma-mp3',
    from: 'WMA',
    to: 'MP3',
    category: 'audio',
    title: 'WMA to MP3 Converter',
    description: 'Convert Windows Media Audio to MP3.'
  },
  'ogg-aac': {
    id: 'ogg-aac',
    from: 'OGG',
    to: 'AAC',
    category: 'audio',
    title: 'OGG to AAC Converter',
    description: 'Convert OGG audio to AAC.'
  },
  'amr-mp3': {
    id: 'amr-mp3',
    from: 'AMR',
    to: 'MP3',
    category: 'audio',
    title: 'AMR to MP3 Converter',
    description: 'Convert AMR (mobile) audio to MP3.'
  },

  // Image
  'jpg-png': {
    id: 'jpg-png',
    from: 'JPG',
    to: 'PNG',
    category: 'image',
    title: 'JPG to PNG Converter',
    description: 'Convert JPEG images to PNG.'
  },
  'jpg-webp': {
    id: 'jpg-webp',
    from: 'JPG',
    to: 'WEBP',
    category: 'image',
    title: 'JPG to WebP Converter',
    description: 'Convert JPEG images to modern WebP.'
  },
  'jpg-svg': {
    id: 'jpg-svg',
    from: 'JPG',
    to: 'SVG',
    category: 'image',
    title: 'JPG to SVG Converter',
    description: 'Raster to vector (experimental).' 
  },
  'png-webp': {
    id: 'png-webp',
    from: 'PNG',
    to: 'WEBP',
    category: 'image',
    title: 'PNG to WebP Converter',
    description: 'Convert PNG to WebP for smaller size.'
  },
  'png-bmp': {
    id: 'png-bmp',
    from: 'PNG',
    to: 'BMP',
    category: 'image',
    title: 'PNG to BMP Converter',
    description: 'Convert PNG to BMP.'
  },
  'png-tiff': {
    id: 'png-tiff',
    from: 'PNG',
    to: 'TIFF',
    category: 'image',
    title: 'PNG to TIFF Converter',
    description: 'Convert PNG to high-quality TIFF.'
  },
  'heic-jpg': {
    id: 'heic-jpg',
    from: 'HEIC',
    to: 'JPG',
    category: 'image',
    title: 'HEIC to JPG Converter',
    description: 'Convert iPhone HEIC to JPG.'
  },
  'svg-png': {
    id: 'svg-png',
    from: 'SVG',
    to: 'PNG',
    category: 'image',
    title: 'SVG to PNG Converter',
    description: 'Convert vector SVG to PNG.'
  },
  'gif-mp4': {
    id: 'gif-mp4',
    from: 'GIF',
    to: 'MP4',
    category: 'video',
    title: 'GIF to MP4 Converter',
    description: 'Convert animated GIF to video MP4.'
  },
  'bmp-jpg': {
    id: 'bmp-jpg',
    from: 'BMP',
    to: 'JPG',
    category: 'image',
    title: 'BMP to JPG Converter',
    description: 'Convert BMP to compressed JPG.'
  },

  // Document
  'docx-pdf': {
    id: 'docx-pdf',
    from: 'DOCX',
    to: 'PDF',
    category: 'document',
    title: 'DOCX to PDF Converter',
    description: 'Convert Word documents to PDF.'
  },
  'docx-txt': {
    id: 'docx-txt',
    from: 'DOCX',
    to: 'TXT',
    category: 'document',
    title: 'DOCX to TXT Converter',
    description: 'Convert Word to Plain Text.'
  },
  'doc-rtf': {
    id: 'doc-rtf',
    from: 'DOC',
    to: 'RTF',
    category: 'document',
    title: 'DOC to RTF Converter',
    description: 'Convert DOC to RTF.'
  },
  'pdf-pptx': {
    id: 'pdf-pptx',
    from: 'PDF',
    to: 'PPTX',
    category: 'document',
    title: 'PDF to PPTX Converter',
    description: 'Convert PDF to PowerPoint.'
  },
  'pdf-xlsx': {
    id: 'pdf-xlsx',
    from: 'PDF',
    to: 'XLSX',
    category: 'document',
    title: 'PDF to XLSX Converter',
    description: 'Convert PDF to Excel.'
  },
  'pdf-txt': {
    id: 'pdf-txt',
    from: 'PDF',
    to: 'TXT',
    category: 'document',
    title: 'PDF to TXT Converter',
    description: 'Extract text from PDF.'
  },
  'pptx-pdf': {
    id: 'pptx-pdf',
    from: 'PPTX',
    to: 'PDF',
    category: 'document',
    title: 'PPTX to PDF Converter',
    description: 'Convert PowerPoint to PDF.'
  },
  'xlsx-csv': {
    id: 'xlsx-csv',
    from: 'XLSX',
    to: 'CSV',
    category: 'document',
    title: 'XLSX to CSV Converter',
    description: 'Convert Excel to CSV.'
  },
  'txt-pdf': {
    id: 'txt-pdf',
    from: 'TXT',
    to: 'PDF',
    category: 'document',
    title: 'TXT to PDF Converter',
    description: 'Convert Text to PDF.'
  },
  'odt-docx': {
    id: 'odt-docx',
    from: 'ODT',
    to: 'DOCX',
    category: 'document',
    title: 'ODT to DOCX Converter',
    description: 'Convert OpenDocument to Word.'
  },

  // Video to Audio (special case)
  'mp4-mp3': {
    id: 'mp4-mp3',
    from: 'MP4',
    to: 'MP3',
    category: 'video',
    title: 'MP4 to MP3 Converter',
    description: 'Extract audio from MP4 video files or URLs.'
  },
  'mp4-wav': {
    id: 'mp4-wav',
    from: 'MP4',
    to: 'WAV',
    category: 'video',
    title: 'MP4 to WAV Converter',
    description: 'Extract high-quality audio from MP4 video files.'
  },
  'mov-mp3': {
    id: 'mov-mp3',
    from: 'MOV',
    to: 'MP3',
    category: 'video',
    title: 'MOV to MP3 Converter',
    description: 'Extract audio from MOV video files.'
  },
  'avi-mp3': {
    id: 'avi-mp3',
    from: 'AVI',
    to: 'MP3',
    category: 'video',
    title: 'AVI to MP3 Converter',
    description: 'Extract audio from AVI video files.'
  },

  // Video Converters
  'mp4-mov': { id: 'mp4-mov', from: 'MP4', to: 'MOV', category: 'video', title: 'MP4 to MOV Converter', description: 'Convert MP4 to MOV format.' },
  'mp4-avi': { id: 'mp4-avi', from: 'MP4', to: 'AVI', category: 'video', title: 'MP4 to AVI Converter', description: 'Convert MP4 to AVI format.' },
  'mp4-mkv': { id: 'mp4-mkv', from: 'MP4', to: 'MKV', category: 'video', title: 'MP4 to MKV Converter', description: 'Convert MP4 to MKV format.' },
  'mp4-webm': { id: 'mp4-webm', from: 'MP4', to: 'WEBM', category: 'video', title: 'MP4 to WebM Converter', description: 'Convert MP4 to WebM format.' },
  'mp4-wmv': { id: 'mp4-wmv', from: 'MP4', to: 'WMV', category: 'video', title: 'MP4 to WMV Converter', description: 'Convert MP4 to WMV format.' },
  'avi-mkv': { id: 'avi-mkv', from: 'AVI', to: 'MKV', category: 'video', title: 'AVI to MKV Converter', description: 'Convert AVI to MKV format.' },
  'flv-mp4': { id: 'flv-mp4', from: 'FLV', to: 'MP4', category: 'video', title: 'FLV to MP4 Converter', description: 'Convert FLV to MP4 format.' },
  '3gp-mp4': { id: '3gp-mp4', from: '3GP', to: 'MP4', category: 'video', title: '3GP to MP4 Converter', description: 'Convert 3GP to MP4 format.' },
  'm4v-mp4': { id: 'm4v-mp4', from: 'M4V', to: 'MP4', category: 'video', title: 'M4V to MP4 Converter', description: 'Convert M4V to MP4 format.' },
  'mpg-mp4': { id: 'mpg-mp4', from: 'MPG', to: 'MP4', category: 'video', title: 'MPG to MP4 Converter', description: 'Convert MPG to MP4 format.' },

  // Archive Converters
  'zip-rar': { id: 'zip-rar', from: 'ZIP', to: 'RAR', category: 'archive', title: 'ZIP to RAR Converter', description: 'Convert ZIP archives to RAR format.' },
  'rar-zip': { id: 'rar-zip', from: 'RAR', to: 'ZIP', category: 'archive', title: 'RAR to ZIP Converter', description: 'Convert RAR archives to ZIP format.' },
  '7z-zip': { id: '7z-zip', from: '7Z', to: 'ZIP', category: 'archive', title: '7Z to ZIP Converter', description: 'Convert 7Z archives to ZIP format.' },
  'zip-7z': { id: 'zip-7z', from: 'ZIP', to: '7Z', category: 'archive', title: 'ZIP to 7Z Converter', description: 'Convert ZIP archives to 7Z format.' },
  'tar-zip': { id: 'tar-zip', from: 'TAR', to: 'ZIP', category: 'archive', title: 'TAR to ZIP Converter', description: 'Convert TAR archives to ZIP format.' },
  'zip-tar': { id: 'zip-tar', from: 'ZIP', to: 'TAR', category: 'archive', title: 'ZIP to TAR Converter', description: 'Convert ZIP archives to TAR format.' },
  'iso-zip': { id: 'iso-zip', from: 'ISO', to: 'ZIP', category: 'archive', title: 'ISO to ZIP Converter', description: 'Convert ISO images to ZIP format.' },
  'zip-iso': { id: 'zip-iso', from: 'ZIP', to: 'ISO', category: 'archive', title: 'ZIP to ISO Converter', description: 'Convert ZIP archives to ISO format.' },

  // Code/Data Format Converters
  'json-csv': { id: 'json-csv', from: 'JSON', to: 'CSV', category: 'code', title: 'JSON to CSV Converter', description: 'Convert JSON data to CSV format.' },
  'csv-json': { id: 'csv-json', from: 'CSV', to: 'JSON', category: 'code', title: 'CSV to JSON Converter', description: 'Convert CSV data to JSON format.' },
  'json-xml': { id: 'json-xml', from: 'JSON', to: 'XML', category: 'code', title: 'JSON to XML Converter', description: 'Convert JSON data to XML format.' },
  'xml-json': { id: 'xml-json', from: 'XML', to: 'JSON', category: 'code', title: 'XML to JSON Converter', description: 'Convert XML data to JSON format.' },
  'csv-xlsx': { id: 'csv-xlsx', from: 'CSV', to: 'XLSX', category: 'code', title: 'CSV to XLSX Converter', description: 'Convert CSV data to Excel format.' },
  'xlsx-csv': { id: 'xlsx-csv', from: 'XLSX', to: 'CSV', category: 'code', title: 'XLSX to CSV Converter', description: 'Convert Excel data to CSV format.' },
  'yaml-json': { id: 'yaml-json', from: 'YAML', to: 'JSON', category: 'code', title: 'YAML to JSON Converter', description: 'Convert YAML data to JSON format.' },
  'json-yaml': { id: 'json-yaml', from: 'JSON', to: 'YAML', category: 'code', title: 'JSON to YAML Converter', description: 'Convert JSON data to YAML format.' },
  'html-markdown': { id: 'html-markdown', from: 'HTML', to: 'Markdown', category: 'code', title: 'HTML to Markdown Converter', description: 'Convert HTML to Markdown format.' },
  'markdown-html': { id: 'markdown-html', from: 'Markdown', to: 'HTML', category: 'code', title: 'Markdown to HTML Converter', description: 'Convert Markdown to HTML format.' },
  'markdown-pdf': { id: 'markdown-pdf', from: 'Markdown', to: 'PDF', category: 'code', title: 'Markdown to PDF Converter', description: 'Convert Markdown to PDF format.' },
};

export function getConversionMeta(id: string): ConversionMeta | null {
  return conversionMap[id] ?? null;
}
