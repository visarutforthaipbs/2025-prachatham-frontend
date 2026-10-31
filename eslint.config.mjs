// eslint-config-next 16 ships native flat configs (FlatCompat no longer works).
// It already registers the jsx-a11y plugin, so we only add rules for it here.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
      // Infographic build inputs are browser ES5 inlined into public/ HTML, linted like public/.
      "scripts/infographics/**",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/html-has-lang": "warn",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-distracting-elements": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",

      // New in eslint-plugin-react-hooks 7 (eslint-config-next 16). Kept as
      // warnings during the Next 16 upgrade so it stays a dependency bump:
      // - error-boundaries flags try/catch around data fetching in async server
      //   pages (intentional CMS-down fallback, e.g. causes/page.tsx)
      // - set-state-in-effect flags hydration-safe mount/theme/media-query code
      // Follow-up to refactor and restore "error": AGENTS.md section 6.
      "react-hooks/error-boundaries": "warn",
      "react-hooks/set-state-in-effect": "warn",

      // Dead code detection
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
