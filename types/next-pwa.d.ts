// types/next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next'
  
  interface PWAConfig {
    dest?: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    sw?: string
    publicExcludes?: string[]
    buildExcludes?: string[]
    runtimeCaching?: any[]
  }
  
  function withPWA(pwaConfig: PWAConfig): (nextConfig: NextConfig) => NextConfig
  
  export = withPWA
}