/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_LOCAL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}