import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import SectionTitle from '@/components/portfolio/ui/SectionTitle';
import { articles } from '@/data/articles';

const Articles: React.FC = () => {
  const featuredArticles = articles.slice(0, 3);

  return (
    <section
      id="articles"
      aria-labelledby="articles-title"
      className="py-20 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Featured Articles"
          subtitle="Insights on policy, technology, and the intersection of AI and governance."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featuredArticles.map((article) => (
            <a
              key={article.id}
              href={`/article/${article.id}`}
              className="group relative block bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/50"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={`Cover image for ${article.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold backdrop-blur-sm border border-cyan-500/30">
                  {article.category}
                </span>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime} read</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                  {article.subtitle}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={`${article.author.name}'s avatar`}
                      className="w-6 h-6 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="text-slate-400 text-xs">{article.author.name}</span>
                  </div>
                  <span className="p-2 rounded-full bg-slate-800 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm font-semibold hover:scale-105 active:scale-95"
          >
            <FileText size={18} aria-hidden="true" />
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Articles);
