(function() {

// identify root object
var root = (typeof self === "object" && self.self === self && self)
    || (typeof global === "object" && global.global === global && global);

/**
 * Create an alarm which runs a callback at a specific time.  Return a function
 * which can be invoked to disable the alarm.
 * @param {Date|string} at
 * @param {function} run
 * @returns {function}
 */
function alarm(at, run) {
    var now = Date.now(),
        timeout;

    if (!(at instanceof Date)) {
        at = new Date(at.toString());
    }

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

// AMD support
if (typeof define === "function" && define.amd) {
    define([], function() {
        return alarm;
    });
}

// CommonJS support
else if (typeof module === "object" && typeof module.exports !== "undefined") {
    module.exports = alarm;
}

// add to root
else root.alarm = alarm;

})();
