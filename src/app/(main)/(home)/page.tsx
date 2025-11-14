import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Image, 
  FileText, 
  Type, 
  Zap, 
  Shield, 
  Clock, 
  Download,
  Globe
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <section className="grid place-content-center place-items-center gap-6 text-center">
        <Badge size="sm">
          Smart Tools Platform <Zap className="ml-1 w-4 h-4" />
        </Badge>

        <h1 className="max-w-6xl">
          Convert, Create, Compress — <span className="text-blue-600">Smarter Tools</span> for Everyday Use
        </h1>

        <p className="max-w-3xl">
          All-in-one platform for your digital needs. Convert audio, images, PDFs, and text 
          with lightning-fast processing. Secure, free, and no registration required.
        </p>

        <div className="flex items-center gap-3">
          <Button className="rounded-full" asChild>
            <Link href="/tools/select">Get Started</Link>
          </Button>

          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/tools/universal">Try Universal Converter</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-center">Our Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border bg-card text-center hover:shadow-lg transition-shadow">
            <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Universal Converter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Convert any file format - upload files or paste URLs from anywhere
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tools/universal">Try Universal</Link>
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-card text-center hover:shadow-lg transition-shadow">
            <Music className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Audio Converter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Convert between MP3, WAV, M4A formats with high quality output
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tools/select?converter=audio">Convert Audio</Link>
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-card text-center hover:shadow-lg transition-shadow">
            <Image className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Image Converter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Transform PNG, JPG, WebP images with compression options
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tools/select?converter=image">Convert Images</Link>
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-card text-center hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">PDF Converter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Convert PDF to DOCX and vice versa with perfect formatting
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tools/select?converter=pdf">Convert PDFs</Link>
            </Button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/tools">See All Tools</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6 text-center">
        <h2>Why Choose ToolNest?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-lg border bg-card">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Process files in seconds with our optimized conversion engine
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Files are processed locally and deleted immediately after conversion
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No Registration</h3>
            <p className="text-sm text-muted-foreground">
              Start converting immediately without creating an account
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <Download className="h-8 w-8 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Free Forever</h3>
            <p className="text-sm text-muted-foreground">
              All basic tools are completely free with no hidden costs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
