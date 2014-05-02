module.exports = {
    suites: {
        'node': {
            exec: 'node',
            tests: 'test/*.test'
        },
        'formatter': {
            exec: 'node',
            tests: 'test/format/*.test'
        },
        'examples': {
            exec: 'dom',
            tests: 'test/examples/**.test'
        }
    }
};