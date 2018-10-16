/// <reference path="../Logger/LogLevel.ts"/>
/// <reference path="../Logger/Scope.ts"/>
var Logger = /** @class */ (function () {
    function Logger() {
        this.loggers = new Array();
        this.scope = null;
    }
    Logger.prototype.setScope = function (scope) {
        if (this.scope == null) {
            this.scope = scope;
        }
        else {
            this.scope.add(scope);
        }
        return scope;
    };
    Logger.prototype.removeScope = function (s) {
        if (this.scope != null) {
            if (this.scope === s) {
                this.scope = null;
            }
            else {
                this.scope.remove(s);
            }
        }
    };
    Logger.prototype.getCaller = function () {
        var txt = "-";
        try {
            throw new Error();
        }
        catch (e) {
            try {
                txt = e.stack.split('at ')[3].split(' ')[0];
            }
            catch (e) {
                txt = "--";
            }
        }
        return txt;
    };
    Logger.prototype.beginScope = function (func) {
        this.beginNamedScope(this.getCaller(), func);
    };
    Logger.prototype.beginNamedScope = function (scope, func) {
        var simpleScope = new Scope(scope);
        try {
            if (log) {
                log.setScope(simpleScope);
                func();
            }
        }
        finally {
            log.removeScope(simpleScope);
        }
    };
    Logger.prototype.SetGlobalMinLevel = function (logLevel) {
        for (var i = 0; i < this.loggers.length; i++) {
            this.loggers[i].minLevel = logLevel;
        }
    };
    Logger.prototype.SetMinLogLevel = function (name, logLevel) {
        for (var i = 0; i < this.loggers.length; i++) {
            if (this.loggers[i].name == name) {
                this.loggers[i].minLevel = logLevel;
            }
        }
    };
    Logger.prototype.logTrace = function (message, error) {
        this.log(LogLevel.Trace, message, error);
    };
    Logger.prototype.logDebug = function (message, error) {
        this.log(LogLevel.Debug, message, error);
    };
    Logger.prototype.logInformation = function (message, error) {
        this.log(LogLevel.Information, message, error);
    };
    Logger.prototype.logWarning = function (message, error) {
        this.log(LogLevel.Warning, message, error);
    };
    Logger.prototype.logError = function (message, error) {
        this.log(LogLevel.Error, message, error);
    };
    Logger.prototype.logCritical = function (message, error) {
        this.log(LogLevel.Critical, message, error);
    };
    Logger.prototype.log = function (logLevel, message, error) {
        var scopeString = "";
        if (this.scope == null) {
            scopeString += this.getCaller();
        }
        else {
            scopeString += this.scope.toString();
        }
        for (var i = 0; i < this.loggers.length; i++) {
            if (this.loggers[i].isEnabled(logLevel)) {
                this.loggers[i].log(logLevel, message, error, scopeString);
            }
        }
    };
    return Logger;
}());
var log = new Logger();
