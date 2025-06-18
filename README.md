
# Worker.js Simulator on Vercel

Simulate running a Cloudflare-style worker.js from any remote URL.

## Usage

Deploy this to Vercel and call:

```
https://your-deployment-url.vercel.app/api/runner?url=https://raw.githubusercontent.com/user/repo/main/worker.js
```

Make sure the worker.js exports a default async function like:

```js
export default async function(request) {
  return new Response("Hello from simulated Worker!");
}
```
