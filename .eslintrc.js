module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["import"]
};
