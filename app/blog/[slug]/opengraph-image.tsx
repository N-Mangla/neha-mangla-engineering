import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getArticle } from "@/data/articles";

export const alt = "Engineering Notes — calendar UI reliability, by Neha Mangla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article || (!article.publishedAt && process.env.NODE_ENV !== "development")) {
    notFound();
  }

  return new ImageResponse(
    (
      <div style={{
        display: "flex", width: "100%", height: "100%", position: "relative",
        background: "linear-gradient(130deg, #151c2a 0%, #1b2639 72%, #223451 100%)",
        color: "#f8f7f3", padding: "60px 70px", flexDirection: "column",
        justifyContent: "space-between", overflow: "hidden",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 2 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 48, height: 48, borderRadius: 13, background: "#526ae4",
            boxShadow: "0 8px 24px #070b184d", fontSize: 20, fontWeight: 700,
          }}>NM</div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 1.5, color: "#c8d0e3" }}>
            NEHA MANGLA <span style={{ margin: "0 14px", color: "#7487a2" }}>/</span> ENGINEERING NOTES
          </div>
        </div>

        <div style={{ display: "flex", width: 850, zIndex: 2, flexDirection: "column", gap: 25 }}>
          <div style={{ display: "flex", fontSize: 19, fontWeight: 600, color: "#8bb1ff", letterSpacing: 2 }}>
            REACT  /  TYPESCRIPT  /  SYSTEM DESIGN
          </div>
          <div style={{ display: "flex", fontSize: 59, fontWeight: 700, lineHeight: 1.13, letterSpacing: -2 }}>
            {article.title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2, borderTop: "1px solid #ffffff29", paddingTop: 22 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#bec8d8" }}>Date handling · State · Data freshness</div>
          <div style={{ display: "flex", fontSize: 22, color: "#e1e6f0" }}>nehamangla.com ↗</div>
        </div>

        <div style={{ display: "flex", position: "absolute", right: -95, top: 155, width: 330, height: 315, border: "1px solid #9ab9ff35", borderRadius: 22, transform: "rotate(-10deg)", flexDirection: "column", padding: 23, gap: 13, background: "#ffffff07" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#9bb6dc", fontSize: 16 }}>
            <span>OCT 2026</span><span>WEEK VIEW</span>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            {["M", "T", "W", "T", "F"].map((day, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 11, width: 44 }}>
                <span style={{ color: "#b7c7df", fontSize: 16 }}>{day}</span>
                <div style={{ display: "flex", height: 132, width: 38, borderRadius: 7, background: index === 2 ? "#6f90ec75" : "#ffffff10", border: "1px solid #ffffff20" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", background: "#79b8ae65", width: 190, height: 25, borderRadius: 6 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
