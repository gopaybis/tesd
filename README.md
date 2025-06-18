
# Vercel Edge Function - Remote Worker.js Runner

Simulasikan worker.js dari URL raw (misal GitHub) tanpa deploy ulang.

## Contoh
https://your-deployment.vercel.app/api/runner?url=https://raw.githubusercontent.com/user/repo/main/worker.js

## Format worker.js:
```js
export default async function(request) {
  return new Response("Halo dari remote worker.js!");
}
```
