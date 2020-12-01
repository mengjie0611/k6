module.exports = {
    "globals": {
        "define": true,
        "requirejs": true
    },
    "env": {
        "browser": true
    },
    "extends": ["standard"], //["standard"]["eslint:recommended"]
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": ["error", "always"]
    }
};