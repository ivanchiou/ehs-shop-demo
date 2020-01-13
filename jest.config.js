module.exports = {
    // setupFiles: ['<rootDir>/jest/setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '@components(.*)$': '<rootDir>/components/$1',
        '@utils(.*)$': '<rootDir>/utils/$1',
        '@hocs(.*)$': '<rootDir>/hocs/$1',
        '@styles(.*)$': '<rootDir>/styles/$1'
    }
}
