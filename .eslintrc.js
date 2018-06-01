module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "airbnb",
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    // Enviroment variables
    __DEVELOPMENT__: true,
  },
  "rules": {
    "max-len": [1, 100, { "ignoreUrls": true }],
    "linebreak-style": 0,
    "no-console": 0,
    "indent": [1, 2, {
      "SwitchCase": 1,
    }],

    // React
    "react/prefer-stateless-function": [2, {
      ignorePureComponents: true
    }],
    "react/sort-comp": [1, {
      order: [
        'type-annotations',
        'static-methods',
        'constructor',
        'getters',
        'chekers',
        'lifecycle',
        'everything-else',
        '/^handle.+$/',
        'rendering',
      ],
      groups: {
        rendering: [
          '/^render.+$/',
          'render',
        ],
        getters: [
          '/^get.+$/',
        ],
        chekers: [
          '/^check.+$/',
        ],
      },
    }],

    // Import
    "import/prefer-default-export": 0,
  },
  plugins: [
    "react", "import", "jsx-a11y",
  ]
}
