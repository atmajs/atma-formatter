module.exports = {
    suites: {
        'node': {
            exec: 'node',
            tests: 'test/*.test'
        },
        'examples': {
            exec: 'dom',
            tests: 'test/examples/**.test'
        }
    }
};