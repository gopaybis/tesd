
# 🌐 Edge Worker Runner - Vercel

Jalankan file JavaScript remote (misal `worker.js`) langsung di Edge Runtime.

## ✅ Deploy
1. Upload ke GitHub
2. Deploy via https://vercel.com/new

## ✅ Contoh Akses
https://your-project.vercel.app/api/runner?url=https://raw.githubusercontent.com/user/repo/main/worker.js

## ✅ Format worker.js yang didukung
```js
export default async function(req) {
  return new Response("Halo dari remote worker.js!");
}
```
