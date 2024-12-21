import sass from 'rollup-plugin-sass';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
        sass({
            output(styles) {
                fs.writeFileSync('dist/styles.css', styles); // Schreibe die CSS-Datei
            },
        }),
    ],
}
