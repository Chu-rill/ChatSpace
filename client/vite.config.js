import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000,
  //   proxy: {
  //     "/api": {
  //       target: "http://127.0.0.1:5001/chatspace-caee5/us-central1/api",
  //     },
  //   },
  // },
});
