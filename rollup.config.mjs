import sass from 'rollup-plugin-sass';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
        },
        {
            file: 'dist/index.cjs',
            format: 'cjs',
        }
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
        sass({
            output: 'dist/styles.css',
        }),
    ],
}
