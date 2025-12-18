import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  size?: "small" | "large";
}

const ArticleCard = ({ id, title, category, date, image, size = "small" }: ArticleCardProps) => {
  const getCategoryClass = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized.includes("financ")) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (normalized.includes("lifestyle")) return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    if (normalized.includes("community")) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    if (normalized.includes("wellness")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (normalized.includes("travel")) return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    if (normalized.includes("creativ")) return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    if (normalized.includes("growth")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  return (
    <Link
      to={`/article/${id}`}
      className={`group relative block rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-all duration-300 hover:-translate-y-1 ${
        size === "large" ? "col-span-1 md:col-span-2 row-span-2" : ""
      }`}
      aria-label={`Read article: ${title}`}
    >
      {/* Card Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
        <img
          src={image}
          alt={`Cover image for ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" aria-hidden="true" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
          {/* Top section - Category and Date */}
          <div className="flex items-start justify-between gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${getCategoryClass(category)}`}>
              {category}
            </span>
            <time 
              dateTime={date}
              className="px-3 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-slate-300 border border-slate-700/50"
            >
              {date}
            </time>
          </div>

          {/* Bottom section - Title */}
          <div className="flex items-end justify-between gap-3">
            <div className="flex-1">
              <span className="text-slate-500 text-[10px] font-mono tracking-wider block mb-2" aria-hidden="true">{id}</span>
              <h3 className="text-slate-100 text-base sm:text-lg md:text-xl font-bold leading-tight tracking-tight group-hover:text-cyan-400 transition-colors">
                {title}
              </h3>
            </div>
            
            {/* Arrow button */}
            <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center group-hover:bg-cyan-600 group-hover:border-cyan-500 transition-all" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;