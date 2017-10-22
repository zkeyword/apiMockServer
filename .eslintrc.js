module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        commonjs: true,
        browser: true,
    },
    extends: [
        // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
        'standard'
    ],
    plugins: [
        'babel',
        'promise'
    ],
    globals: {
        '__DEV__': true,
        '__PROD__': true,
        '__COMPONENT_DEVTOOLS__': false,
        '__WHY_DID_YOU_UPDATE__': false
    },
    // add your custom rules here
    'rules': {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'space-before-function-paren': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-useless-escape': 0,
        'no-return-await': 0
    }
}