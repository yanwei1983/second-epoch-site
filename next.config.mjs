const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  trailingSlash: true
};
export default nextConfig;
