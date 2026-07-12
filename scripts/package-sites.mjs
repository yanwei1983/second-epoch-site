import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/public', { recursive: true });
await cp('out', 'dist/public', { recursive: true });
await cp('.openai', 'dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};\n`);
