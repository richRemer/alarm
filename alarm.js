/**
 * Create an alarm which runs a callback at a specific time.  Return a function
 * which can be invoked to disable the alarm.
 * @param {Date} at
 * @param {function} run
 * @returns {function}
 */
function alarm(at, run) {
    var now = Date.now(),
        timeout;

    if (at.getTime() >= now) {
        timeout = setTimeout(run, at.getTime() - now);
    }

    return function() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
    }
}

module.exports = alarm;
