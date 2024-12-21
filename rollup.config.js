const sass = require('rollup-plugin-sass');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs', // CommonJS
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json', // Stelle sicher, dass die richtige Datei verwendet wird
        }),
        sass({
            output(styles) {
                const fs = require('fs');
                fs.writeFileSync('dist/styles.css', styles); // Schreibe die CSS-Datei
            },
        }),
    ],
};