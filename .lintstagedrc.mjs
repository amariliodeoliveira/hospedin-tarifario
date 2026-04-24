import path from "path";

const buildEslintCommand = (filenames) =>
  `eslint --max-warnings=0 ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(" ")}`;

const config = {
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "**/*.{json,md,yml,yaml}": ["prettier --write"],
};

export default config;
