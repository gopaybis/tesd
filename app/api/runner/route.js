
export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl || !rawUrl.startsWith("https://")) {
    return new Response("❌ Parameter ?url=https://... wajib", { status: 400 });
  }

  try {
    const code = await fetch(rawUrl).then(res => res.text());
    const blob = new Blob([code], { type: "application/javascript" });
    const blobURL = URL.createObjectURL(blob);
    const mod = await import(blobURL);

    if (typeof mod.default !== "function") {
      return new Response("❌ File tidak memiliki export default function", { status: 500 });
    }

    const result = await mod.default(req);
    return result instanceof Response
      ? result
      : new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
  } catch (err) {
    return new Response("⚠️ Gagal menjalankan: " + err.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
