module.exports = {

    parser: "babel-eslint",

    plugins: [
        "react", 
        "react-hooks", 
        "@typescript-eslint", 
        "prettier"
    ],

    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],

    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
        "no-console": "off",
        "comma-dangle": "off",
        "import/prefer-default-export": "off",
        "quotes": [2, "double", { "avoidEscape": true }],
        "indent": [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"semi": [ "error", "always" ]
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typecript: {}
        }
    }
};