import { App } from "@/data/apps";
import AppCard from "./AppCard";

interface AppSectionProps {
  title: string;
  apps: App[];
}

export default function AppSection({ title, apps }: AppSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button className="text-purple-600 hover:text-purple-700 font-medium transition">
          View all →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}