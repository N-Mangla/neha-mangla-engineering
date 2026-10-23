import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getArticle } from "@/data/articles";

export const alt = "Calendar UI date handling — Engineering Notes by Neha Mangla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article?.publishedAt && process.env.NODE_ENV !== "development") notFound();
  if (!article) notFound();

  const rows = [
    { label: "SOURCE VALUE", value: "2026-10-23", detail: "Date-only event", background: "#242d3a", color: "#e7edf6" },
    { label: "UNEXPECTED", value: "Oct 22", detail: "Converted as UTC midnight", background: "#34292e", color: "#ffbcb6" },
    { label: "INTENDED", value: "Oct 23", detail: "Keep the calendar date", background: "#23362f", color: "#b4e1c4" },
  ];

  return new ImageResponse(
    <div style={{
      display: "flex", width: "100%", height: "100%", background: "#18212e",
      color: "#f5f4f0", padding: "56px 62px", position: "relative",
      fontFamily: "sans-serif",
    }}>
      <div style={{ display: "flex", flexDirection: "column", width: 720, justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 17, letterSpacing: 1.5, color: "#a6b7c9" }}>
          ENGINEERING NOTES <span style={{ margin: "0 13px", color: "#66798b" }}>/</span> NEHA MANGLA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 32 }}>
          <div style={{ display: "flex", color: "#8fb4cf", fontSize: 18, letterSpacing: 1 }}>
            REACT · TYPESCRIPT · CALENDAR SYSTEMS
          </div>
          <div style={{
            display: "flex", fontSize: 57, fontWeight: 700,
            lineHeight: 1.12, letterSpacing: -2, maxWidth: 690,
          }}>{article.title}</div>
          <div style={{ display: "flex", color: "#b3c1cf", fontSize: 23, lineHeight: 1.4, maxWidth: 620 }}>
            The date bug that a perfectly normal calendar can hide.
          </div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #405063", paddingTop: 21, fontSize: 20, color: "#c2cbd5" }}>
          nehamangla.com
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 340, justifyContent: "center", gap: 12, marginLeft: 18 }}>
        <div style={{ display: "flex", fontSize: 15, color: "#aabbd0", letterSpacing: 1.3, marginBottom: 8 }}>
          WHY THE DATE SHIFTED
        </div>
        {rows.map((row) => (
          <div key={row.label} style={{
            display: "flex", flexDirection: "column", background: row.background,
            border: "1px solid #475161", borderRadius: 12, padding: "16px 19px", gap: 5,
          }}>
            <div style={{ display: "flex", fontSize: 12, letterSpacing: 1.2, color: "#aebdca" }}>{row.label}</div>
            <div style={{ display: "flex", fontSize: 31, fontWeight: 700, color: row.color }}>{row.value}</div>
            <div style={{ display: "flex", fontSize: 15, color: "#c5ced9" }}>{row.detail}</div>
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
