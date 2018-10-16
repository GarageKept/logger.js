var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        log.beginScope(function () {
            log.logTrace("Test2");
            _this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
        });
    };
    Greeter.prototype.stop = function () {
        var _this = this;
        log.beginScope(function () {
            log.logTrace("Test3");
            clearTimeout(_this.timerToken);
        });
    };
    return Greeter;
}());
window.onload = function () {
    log.beginScope(function () {
        log.logTrace("trace test");
        var txt = "This is constructor text";
        log.beginNamedScope("inline Scope", function () {
            log.logTrace("Setting txt from: " + txt);
            txt = "This is now set";
            log.logTrace("now it is: " + txt);
        });
        log.logTrace("Should be same still: " + txt);
        log.logDebug("debug test");
        log.logInformation("information test");
        log.logWarning("warning test");
        log.logError("error test");
        log.logCritical("critical test");
        var el = document.getElementById('content');
        var greeter = new Greeter(el);
        greeter.start();
    });
};
