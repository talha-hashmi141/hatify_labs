import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hatify Labs — AI, Web & Cloud Engineering Studio";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(800px 400px at 50% -10%, rgba(190,242,100,0.12), transparent), #050505",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 28px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.16)",
            color: "#d4d4d8",
            fontSize: 24,
            letterSpacing: 8,
          }}
        >
          SOFTWARE · AI · CLOUD · SECURITY
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 110,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -3,
          }}
        >
          Hatify Labs
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 32, color: "#a1a1aa" }}>
          We engineer intelligent software for serious business.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 260,
            height: 6,
            borderRadius: 999,
            background: "#bef264",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
