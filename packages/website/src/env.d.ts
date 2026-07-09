interface ImportMetaEnv {
  readonly PUBLIC_APP_URL: string
  readonly VALKEY_URL: string
  readonly LASTFM_API_KEY: string
  readonly LASTFM_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css'
declare module '@fontsource/*' {}
declare module '@fontsource-variable/*' {}
