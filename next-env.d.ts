/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="ethers" />

declare interface Window {
  ethereum: ExternalProvider
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  }
}
