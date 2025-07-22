import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [new URL('http://api.worldoftanks.eu/**')],
   },
}

export default nextConfig
