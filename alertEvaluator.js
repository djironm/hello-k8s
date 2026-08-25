function evaluateAlert(cpuUsage, threshold) {
    return cpuUsage > threshold;
}

module.exports = { evaluateAlert };
