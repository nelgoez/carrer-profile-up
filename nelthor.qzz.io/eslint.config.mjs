import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default compat.config({
  rules: {
    'style/semi': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'perfectionist/sort-imports': 'off',
    'ts/promise-function-async': 'off',
    'style/arrow-parens': 'off',
    'import/first': 'off',
  },
});
