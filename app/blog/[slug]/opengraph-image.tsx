import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getArticle } from "@/data/articles";

export const alt = "Neha Mangla — Engineering Notes";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171e2a",
          color: "#f6f5f0",
          width: "100%",
          height: "100%",
          padding: "74px 78px",
        }}
      >
        <div style={{ display: "flex", fontSize: 23, letterSpacing: 2, color: "#b8c8ee" }}>
          NEHA MANGLA / ENGINEERING NOTES
        </div>
        <div style={{ display: "flex", fontSize: 65, fontWeight: 700, lineHeight: 1.13, letterSpacing: -2 }}>
          {article.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 25, color: "#c7c9d0" }}>
          <span>React · TypeScript · Frontend Engineering</span>
          <span>nehamangla.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
