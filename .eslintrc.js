//.eslintrc.js
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	settings: {
		react: {
			version: 'detect',
		},
		// 'import/resolver': {
		// 	alias: {
		// 		map: [
		// 			// ['*', '.'],
		// 			// ['@src', './src'],
		// 			['@components', '/src/components'],
		// 			['@shared', '/src/shared'],
		// 			// ['@app', '/src/app'],
		// 			// ['@types', '/src/types'],
		// 			// ['@page', '/src/page'],
		// 		],
		// 	},
		// 	// node: {
		// 	// 	extensions: ['.js', '.jsx', '.ts', '.tsx'],
		// 	// 	moduleDirectory: ['node_modules', 'src/'],
		// 	// },
		// },
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:import/recommended',
	],
	rules: {
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
}
