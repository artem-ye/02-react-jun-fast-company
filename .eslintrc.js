module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'space-infix-ops': 'off',
        'react/prop-types': 'off',
        'object-curly-spacing': 'off',
        'space-before-function-paren': 'off',
        'comma-dangle': 'off'
    }
};
