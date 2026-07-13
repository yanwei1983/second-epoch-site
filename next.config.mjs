const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true
};
export default nextConfig;
