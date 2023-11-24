import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "vite-plugin-list-drawings",
      configureServer(server) {
        // Example: wait for a client to connect before sending a message
        server.ws.on("connection", () => {
          setTimeout(() => {
            server.ws.send("my:greetings", { msg: "hello" });
          }, 1000);
        });
      },
    },
  ],
});
