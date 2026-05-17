interface ImportMetaEnv {
  readonly PUBLIC_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.css'
declare module '@fontsource/*' {}
declare module '@fontsource-variable/*' {}
