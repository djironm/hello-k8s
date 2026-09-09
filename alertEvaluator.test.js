const { evaluateAlert } = require('./alertEvaluator');

const test = require('node:test');
const assert = require('node:assert');

test('alerts when CPU exceeds threshold', () => {
    const cpuUsage = 85;
    const threshold = 80;

    const result = evaluateAlert(cpuUsage, threshold);

    assert(result === true);
});

test('does not alert when CPU below threshold', () => {
    const cpuUsage = 70;
    const threshold = 80;

    const result = evaluateAlert(cpuUsage, threshold);

    assert(result === false);
});

test('does not alert when CPU equal threshold', () => {
     const cpuUsage = 80;
     const threshold = 80;
     
     const result = evaluateAlert(cpuUsage, threshold);
     
     assert(result === false);
});
