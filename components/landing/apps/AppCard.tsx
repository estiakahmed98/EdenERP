import { App } from "@/data/apps";
import { Star, Download, Building2 } from "lucide-react";
import Image from "next/image";

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Banner Image Placeholder */}
      <div className={`h-32 ${app.gradient} relative overflow-hidden`}>
        {app.imageSrc ? (
          <Image
            src={encodeURI(app.imageSrc)}
            alt={app.title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
            priority={false}
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-900">
          {app.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
          {app.title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <Building2 className="h-3 w-3" />
          <span>{app.vendor}</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {app.price === "FREE" ? (
            <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
              FREE
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">{app.price}</span>
          )}
        </div>

        {/* Rating & Downloads */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(app.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">{app.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Download className="h-3 w-3" />
            <span>{app.downloads.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
