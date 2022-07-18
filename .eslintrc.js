module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'max-len': [1, { code: 120 }],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'linebreak-style': 'off',
    'newline-per-chained-call': 'off',
    'operator-linebreak': 'off',
  },
  overrides: [
    {
      files: ['src/api/**/*'],
      rules: {
        camelcase: 0,
      },
    },
    {
      files: ['./*', '_templates/**/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['./*', '_templates/**/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
