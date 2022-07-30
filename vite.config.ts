import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    port: 8080,
    host: 'test.163.com',
    https: {
      key: './.cert/test.163.com-key.pem',
      cert: './.cert/test.163.com.pem'
    }
  }
})
