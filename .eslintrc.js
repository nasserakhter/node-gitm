module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['xo', 'prettier'],
  overrides: [
    {
      extends: ['xo-typescript'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
      },
    },
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
