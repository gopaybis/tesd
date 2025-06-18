
export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl || !rawUrl.startsWith("https://")) {
    return new Response("❌ URL tidak valid. Tambahkan ?url=https://...", { status: 400 });
  }

  try {
    const moduleCode = await fetch(rawUrl).then(res => res.text());
    const blob = new Blob([moduleCode], { type: "application/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    const mod = await import(blobUrl);

    if (typeof mod.default !== "function") {
      return new Response("❌ Module tidak memiliki default export function.", { status: 500 });
    }

    const result = await mod.default(req);
    return result instanceof Response
      ? result
      : new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (e) {
    return new Response("⚠️ Gagal menjalankan kode:\n" + e.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
