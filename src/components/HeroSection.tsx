import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="relative rounded-[2.5rem] overflow-hidden bg-muted my-12 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 p-6 md:p-12 lg:p-16 bg-card">
        {/* Left side - Image */}
        <div className="relative aspect-[4/3] md:aspect-auto rounded-[2rem] overflow-hidden animate-scale-in">
          <img alt="Hero" className="w-full h-full transition-transform duration-700 hover:scale-110 object-scale-down" src="/lovable-uploads/184f0a98-46c9-4ef2-9b81-aec2466b04ef.png" />
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-slide-down">
              Journey Through Life's Spectrum
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl animate-slide-up stagger-1">
              Welcome to Perspective's Blog: A Realm of Reflection, Inspiration, and Discovery. Where Words Illuminate
              Paths of Meaning and Thoughts Unravel the Mysteries of Life's Spectrum.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 pt-4 animate-slide-up stagger-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 md:px-10 md:py-6 font-medium transition-all hover:scale-105 w-full sm:w-auto text-sm rounded-sm">
              Join Now
            </Button>

            <div className="flex items-center gap-4">
              <a href="#instagram" className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#facebook" className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;