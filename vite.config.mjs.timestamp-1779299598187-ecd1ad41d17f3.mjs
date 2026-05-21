// vite.config.mjs
import { defineConfig } from "file:///F:/Project/sub-project/tch/node_modules/vite/dist/node/index.js";
import laravel from "file:///F:/Project/sub-project/tch/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///F:/Project/sub-project/tch/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  server: {
    host: "127.0.0.1",
    hmr: {
      host: "127.0.0.1"
    }
  },
  plugins: [
    laravel({
      input: [
        "resources/css/tailwind.css",
        "resources/js/site.js",
        "resources/js/calculator/main.tsx"
      ],
      refresh: true
    }),
    react()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcUHJvamVjdFxcXFxzdWItcHJvamVjdFxcXFx0Y2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFByb2plY3RcXFxcc3ViLXByb2plY3RcXFxcdGNoXFxcXHZpdGUuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovUHJvamVjdC9zdWItcHJvamVjdC90Y2gvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBsYXJhdmVsIGZyb20gJ2xhcmF2ZWwtdml0ZS1wbHVnaW4nO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIGhvc3Q6ICcxMjcuMC4wLjEnLFxyXG4gICAgICAgIGhtcjoge1xyXG4gICAgICAgICAgICBob3N0OiAnMTI3LjAuMC4xJyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBsYXJhdmVsKHtcclxuICAgICAgICAgICAgaW5wdXQ6IFtcclxuICAgICAgICAgICAgICAgICdyZXNvdXJjZXMvY3NzL3RhaWx3aW5kLmNzcycsXHJcbiAgICAgICAgICAgICAgICAncmVzb3VyY2VzL2pzL3NpdGUuanMnLFxyXG4gICAgICAgICAgICAgICAgJ3Jlc291cmNlcy9qcy9jYWxjdWxhdG9yL21haW4udHN4JyxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgICAgICByZWFjdCgpLFxyXG4gICAgXSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUSxTQUFTLG9CQUFvQjtBQUN2UyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNELE1BQU07QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0g7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
