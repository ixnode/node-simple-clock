import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Füge SCSS-Module Unterstützung hinzu
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true, // Aktiviert CSS-Module
          },
        },
        'sass-loader',
      ],
      include: /src/,
    });

    // Füge globale SCSS-Unterstützung hinzu (ohne CSS-Module)
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
      include: /src/,
    });

    // Optional: Füge globale SCSS-Imports hinzu, falls erforderlich
    // config.entry = [
    //   path.resolve(__dirname, '../src/global.scss'),
    //   ...config.entry,
    // ];

    return config;
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
export default config;
