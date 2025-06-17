import { dirname, resolve } from "path";
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import svgr from 'vite-plugin-svgr';

// 현재 파일의 디렉토리 경로를 가져오기
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    svgr(),
  ],
  //빌드 옵션을 정의
  build: {
    // 라이브러리 모드로 빌드하는 데 필요한 설정을 정의
    lib: {
      // 진입점
      entry: resolve(__dirname, 'src/index.ts'),
      // 라이브러리 이름
      name: "emcore-js",
      // 라이브러리 포맷
      formats: ["es", 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    // Rollup에 전달될 추가 옵션을 정의
    rollupOptions: {
      // 빌드 과정에서 외부로 처리될 패키지를 명시
      external: ["react", "react-dom"],
      // 빌드 결과물의 출력 옵션을 설정
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "styles/[name].[ext]",
      },
    },
  },
})
