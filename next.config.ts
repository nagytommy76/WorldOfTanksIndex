import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [new URL('http://api.worldoftanks.eu/**'), new URL('https://eu-wotp.wgcdn.co/**')],
   },
}

export default nextConfig
