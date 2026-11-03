"use client";
import { useEffect, useState } from "react";
import {
  DEFAULT_PLANNER_SETTINGS,
  PLANNER_SETTINGS_EVENT,
  PLANNER_SETTINGS_KEY,
  readPlannerSettings,
} from "@/lib/live-demo-planner";

export function usePlannerSettings() {
  const [settings, setSettings] = useState(DEFAULT_PLANNER_SETTINGS);
  useEffect(() => {
    const read = () => setSettings(readPlannerSettings());
    const storage = (event: StorageEvent) => {
      if (event.key === PLANNER_SETTINGS_KEY || event.key === null) read();
    };
    read();
    window.addEventListener(PLANNER_SETTINGS_EVENT, read);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(PLANNER_SETTINGS_EVENT, read);
      window.removeEventListener("storage", storage);
    };
  }, []);
  return settings;
}
