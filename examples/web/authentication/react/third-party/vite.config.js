import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "^/accounts/.*": {
        target:
          "https://webauththirdpartyreact-840233827.development.catalystserverless.com",
        changeOrigin: true
      },
      "^/baas/v1/.*": {
        target:
          "https://console.catalyst.zoho.com",
        changeOrigin: true
      },
      "^/__catalyst/.*": {
        target:
          "https://webauththirdpartyreact-840233827.development.catalystserverless.com",
        changeOrigin: true
      }
    }
  }
});
