import { defineConfig } from "vite";
import sass from "sass";
import * as path from "path";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

const phasermsg = () => {
    return {
        name: "phasermsg",
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        buildEnd() {
            const line =
                "---------------------------------------------------------";
            const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);

            process.stdout.write(`✨ Done ✨\n`);
        },
    };
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
        phasermsg()
    ],
    resolve: {
        alias: [
            { find: "@di", replacement: path.resolve(__dirname, "src/di") },
            { find: "@domain", replacement: path.resolve(__dirname, "src/domain") },
            { find: "@infraestructure", replacement: path.resolve(__dirname, "src/infraestructure") },
            { find: "@presentation", replacement: path.resolve(__dirname, "src/presentation") }
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ["phaser"],
                },
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                passes: 2,
            },
            mangle: true,
            format: {
                comments: false,
            },
        },
    },
    server: {
        port: 8080,
    },
});

