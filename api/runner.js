
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Missing or invalid ?url=..." });
  }

  try {
    const response = await fetch(url);
    const jsCode = await response.text();

    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const simulatedFetch = new AsyncFunction("request", jsCode);

    const simulatedRequest = {
      url: req.url,
      method: req.method,
      headers: req.headers,
    };

    const workerResponse = await simulatedFetch(simulatedRequest);

    if (workerResponse instanceof Response) {
      const text = await workerResponse.text();
      res.status(workerResponse.status).send(text);
    } else {
      res.status(200).json(workerResponse);
    }

  } catch (err) {
    res.status(500).json({ error: "Gagal menjalankan worker.js", details: err.message });
  }
}
