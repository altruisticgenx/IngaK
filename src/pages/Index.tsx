import { useEffect } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import { ArticleSummaryDialog } from "@/components/ai/ArticleSummaryDialog";
import { articles } from "@/data/articles";

const Index = () => {
  const featuredArticles = articles.slice(0, 6);

  useEffect(() => {
    document.title = "Blog Articles | Perspective";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 animate-fade-in">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Intro Section */}
        <IntroSection />

        {/* Featured Articles Grid */}
        <section id="articles" className="py-16">
          <div className="flex items-center justify-between mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Featured Articles</h2>
            <a
              href="#all"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors px-4 py-2 rounded-full hover:bg-slate-800/60 border border-slate-700/50"
            >
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                <ArticleCard {...article} size="small" />
                <div className="mt-3 flex justify-end">
                  <ArticleSummaryDialog article={article} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="my-20 rounded-2xl glass-dark p-8 md:p-12 text-center animate-scale-in border border-slate-700/50">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">Stay inspired.</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Subscribe to receive our latest articles and insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all shadow-lg shadow-cyan-900/30">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-slate-100">Explore</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/wellness" className="hover:text-cyan-400 transition-colors">
                    Wellness
                  </a>
                </li>
                <li>
                  <a href="/travel" className="hover:text-cyan-400 transition-colors">
                    Travel
                  </a>
                </li>
                <li>
                  <a href="/creativity" className="hover:text-cyan-400 transition-colors">
                    Creativity
                  </a>
                </li>
                <li>
                  <a href="/growth" className="hover:text-cyan-400 transition-colors">
                    Growth
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-100">About</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/about" className="hover:text-cyan-400 transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="/authors" className="hover:text-cyan-400 transition-colors">
                    Authors
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-100">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/style-guide" className="hover:text-cyan-400 transition-colors">
                    Style Guide
                  </a>
                </li>
                <li>
                  <a href="/#newsletter" className="hover:text-cyan-400 transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-slate-100">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="/privacy" className="hover:text-cyan-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-cyan-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>© 2025 Perspective. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;