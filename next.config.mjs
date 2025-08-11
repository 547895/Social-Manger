/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: true,
  },
  // Ensure proper routing
  trailingSlash: false,
  // Fix for deployment
  output: 'standalone',
}

export default nextConfig
