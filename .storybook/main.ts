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
        /* Initialization if module is undefined. */
        if (!config.module) {
            config.module = { rules: [] };
        }

        /* Initialization if rules is undefined. */
        if (!config.module.rules) {
            config.module.rules = [];
        }

        /* Add SCSS module support */
        config.module.rules.push({
            test: /\.module\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true, /* Activates CSS modules */
                    },
                },
                'sass-loader',
            ],
            include: /src/,
        });

        /* Add global SCSS support (without CSS modules). */
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

        return config;
    },
};
export default config;
