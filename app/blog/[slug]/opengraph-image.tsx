import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getArticle } from "@/data/articles";

export const alt = "A calendar can render perfectly and still show the wrong day — Engineering Notes";
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
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      width: "100%", height: "100%", background: "#141922", color: "#f5f3ee",
      padding: "58px 72px", fontFamily: "sans-serif",
    }}>
      <div style={{ display: "flex", fontSize: 17, letterSpacing: 1.7, color: "#9eacbf" }}>
        ENGINEERING NOTES <span style={{ margin: "0 14px", color: "#66778d" }}>/</span> NEHA MANGLA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{
          display: "flex", flexDirection: "column", alignSelf: "flex-start",
          gap: 10, padding: "23px 28px", background: "#1d2531",
          borderLeft: "3px solid #7397c1", borderRadius: 5,
          fontFamily: "monospace",
        }}>
          <div style={{ display: "flex", fontSize: 23, color: "#dbe4f0" }}>
            <span style={{ color: "#a7c4ed" }}>new Date</span><span>(</span><span style={{ color: "#d9c398" }}>&quot;2026-10-23&quot;</span><span>);</span>
          </div>
          <div style={{ display: "flex", fontSize: 21, color: "#9faec0" }}>
            // Los Angeles → <span style={{ color: "#e7b1ac", marginLeft: 9 }}>October 22</span>
          </div>
        </div>
        <div style={{
          display: "flex", fontSize: 62, fontWeight: 700,
          letterSpacing: -2, lineHeight: 1.1, maxWidth: 1010,
        }}>
          A calendar can render perfectly and still show the wrong day.
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 20, borderTop: "1px solid #ffffff23",
        fontSize: 20, color: "#aebaca",
      }}>
        <span>Dates · Timezones · UI correctness</span>
        <span>nehamangla.com</span>
      </div>
    </div>,
    { ...size }
  );
}
