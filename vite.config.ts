import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      entry: './core/HttpRequest.ts',
      name: 'pine-http',
      fileName: (format) => `pine-http.${format}.js`
    },
  },
  server: {
    port: 8080,
    host: 'test.163.com',
    https: {
      key: './.cert/test.163.com-key.pem',
      cert: './.cert/test.163.com.pem'
    }
  }
})
