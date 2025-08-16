import type { Preview } from "@storybook/react";
import "../src/index.css";

// Global tools for theme
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
        { value: "system", title: "System" },
      ],
    },
  },
};

// Dark Theme
export const decorators: Preview["decorators"] = [
  (Story, context) => {
    const theme = context.globals.theme as "light" | "dark" | "system";
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    return Story();
  },
];


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { default: "light" },
  },
};

export default preview;
