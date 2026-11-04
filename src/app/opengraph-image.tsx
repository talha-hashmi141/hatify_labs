import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hatify Labs — Software & AI Engineering Studio";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(700px 420px at 100% 0%, rgba(8,123,255,0.45), transparent 70%), radial-gradient(600px 400px at 0% 100%, rgba(0,201,232,0.22), transparent 70%), #071B49",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M7.5 15.6 18.6 11.4v44.4L7.5 60Z" fill="#0A72F0" />
            <path d="M45.4 12 56.5 7.8v44.4L45.4 56.4Z" fill="#00C9E8" />
            <path d="M19.4 33.4 31.9 26.3l9.8 5.6" fill="none" stroke="#2E9BFF" strokeWidth="5.6" strokeLinejoin="round" />
            <path d="M22.3 40.4l9.6 5.6 12.6-7.2" fill="none" stroke="#0A72F0" strokeWidth="5.6" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: 5 }}>
            HATIFY <span style={{ color: "#00C9E8", marginLeft: 12 }}>LABS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
            For millions of users, we build delightful solutions.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
            Software & AI engineering · Web & mobile · Cloud · Data
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex", width: 120, height: 4, borderRadius: 4, background: "linear-gradient(90deg,#0866E8,#00C9E8)" }} />
          Innovation with Integrity. Transformation with Purpose.
        </div>
      </div>
    ),
    { ...size }
  );
}
