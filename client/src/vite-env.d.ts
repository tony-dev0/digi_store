/// <reference types="vite/client" />
// /// <reference types="vite/types/importMeta.d.ts" />
// import { defineConfig } from 'vite'
//  import react from '@vitejs/plugin-react'

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

// const viteEnv = {}
// Object.keys(process.env).forEach((key) => {
//    if (key.startsWith(`VITE_`)) {
// viteEnv[`import.meta.env.${key}`] = process.env[key]
// }
// })
// // https://vitejs.dev/config/
// export default defineConfig({
// define: viteEnv,
// plugins: [react()]
// })

// const cherryPickedKeys = [
//   "REACT_APP_FIREBASE_API_KEY"
// ];

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   const processEnv = {};
//   cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

//   return {
//     define: {
//       'process.env': processEnv
//     },
//     plugins: [react()],
//   }
// })