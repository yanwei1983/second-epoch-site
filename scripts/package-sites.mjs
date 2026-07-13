import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/assets', { recursive: true });
await cp('out', 'dist/assets', { recursive: true });
await cp('.openai', 'dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};\n`);

await rm('site-build.tar.gz', { force: true });
await execFileAsync('tar', ['-czf', 'site-build.tar.gz', 'dist']);
