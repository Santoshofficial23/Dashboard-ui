

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_ENDPOINT: string;
  readonly VITE_BANK_API_ENDPOINT: string;
  readonly VITE_FILE_PATH_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}