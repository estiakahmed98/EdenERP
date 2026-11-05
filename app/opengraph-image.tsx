import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = "Adon ERP - Enterprise Solution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg,#714b67 0%,#02a6a6 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 44, marginTop: 24, opacity: 0.95 }}>
          All-in-one ERP for Accounting, CRM, HR, POS & Manufacturing
        </div>
      </div>
    ),
    size,
  );
}
