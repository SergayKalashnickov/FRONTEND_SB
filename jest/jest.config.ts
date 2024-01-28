import type { Config } from 'jest'
import * as path from 'path'

const config: Config = {
	preset: 'ts-jest/presets/js-with-ts',
	clearMocks: true,
	automock: false,
	resetMocks: false,
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	rootDir: 'C:\\Users\\kiruh\\FRONTEND_SB',
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@root(.*)$': '<rootDir>/src/$1',
		'\\.svg': path.resolve(__dirname, 'emptyMockComponent.tsx'),
	},
	transform: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/jest/fileTransformer.ts',
	},
	transformIgnorePatterns: ['node_modules'],
	setupFiles: ['<rootDir>/jest/setupJest.ts'],
}

export default config
