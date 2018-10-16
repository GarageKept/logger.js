var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Information"] = 2] = "Information";
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
})(LogLevel || (LogLevel = {}));
var Scope = /** @class */ (function () {
    function Scope(name) {
        this.name = name;
        this.childScope = null;
    }
    Scope.prototype.add = function (scope) {
        if (this.childScope == null) {
            this.childScope = scope;
        }
        else {
            this.childScope.add(scope);
        }
    };
    Scope.prototype.remove = function (scope) {
        if (this.childScope != null) {
            if (this.childScope.toString() === scope.toString()) {
                this.childScope = null;
            }
            else {
                this.childScope.remove(scope);
            }
        }
    };
    Scope.prototype.toString = function () {
        if (this.childScope != null) {
            return this.name + "\\" + this.childScope.toString();
        }
        else {
            return this.name;
        }
    };
    return Scope;
}());
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
/// <reference path="../Logger/Logger.ts"/>
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(logLevel) {
        this.name = "ConsoleLogger";
        if (logLevel == null) {
            this.minLevel = LogLevel.Warning;
        }
        else {
            this.minLevel = logLevel;
        }
    }
    ConsoleLogger.prototype.isEnabled = function (logLevel) {
        var isEnabled = false;
        var num = Number(this.parseQueryString("loglevel"));
        if (num >= 6) {
            isEnabled = this.minLevel <= logLevel;
        }
        else {
            isEnabled = num <= logLevel;
        }
        //console.log("this.minLevel: " + this.minLevel);
        //console.log("logLevel: " + logLevel);
        //console.log("this.parseQueryString(\"loglevel\"): " + this.parseQueryString("loglevel"));
        //console.log("Number(this.parseQueryString(\"loglevel\"): " + Number(this.parseQueryString("loglevel")));
        //console.log("this.minLevel <= logLevel: " + (this.minLevel <= logLevel));
        //console.log("Number(this.parseQueryString(\"loglevel\")) <= logLevel: " + (Number(this.parseQueryString("loglevel")) <= logLevel));
        //console.log("this.minLevel <= logLevel || Number(this.parseQueryString(\"loglevel\")) <= logLevel;: " + (this.minLevel <= logLevel || Number(this.parseQueryString("loglevel")) <= logLevel));
        return isEnabled;
    };
    ConsoleLogger.prototype.log = function (logLevel, message, error, scope) {
        if (this.isEnabled(logLevel)) {
            var style = "background: #222; color: #bada55";
            switch (logLevel) {
                case LogLevel.Trace:
                    style = "background: #FFF; color: #303030";
                    break;
                case LogLevel.Debug:
                    style = "background: #FFF; color: #00ffed";
                    break;
                case LogLevel.Information:
                    style = "background: #FFF; color: #00ff65";
                    break;
                case LogLevel.Warning: // yellow
                    style = "background: #FFF; color: #ffb600";
                    break;
                case LogLevel.Error: // red
                    style = "background: #FFF; color: #F00";
                    break;
                case LogLevel.Critical: // red?!?
                    style = "background: #F00; color: #FFF";
                    break;
            }
            console.log("%c " + this.logLevelToString(logLevel) + ": (" + scope + ") " + message + " ", style);
            if (error) {
                console.log("%c " + this.logLevelToString(logLevel) + ": (" + scope + ") " + error.message + " ", style);
                console.log("%c " + this.logLevelToString(logLevel) + ": (" + scope + ") " + error.stack + " ", style);
            }
        }
    };
    ConsoleLogger.prototype.logLevelToString = function (logLevel) {
        switch (logLevel) {
            case LogLevel.Trace:
                return "Trace";
            case LogLevel.Information:
                return "Information";
            case LogLevel.Debug:
                return "Debug";
            case LogLevel.Warning:
                return "Warning";
            case LogLevel.Error:
                return "Error";
            case LogLevel.Critical:
                return "Critical";
            default:
                return "";
        }
    };
    ConsoleLogger.prototype.parseQueryString = function (key) {
        var queryString = window.location.search.substring(1);
        var value = "100";
        var queries = queryString.split("&");
        queries.forEach(function (indexQuery) {
            var indexPair = indexQuery.split("=");
            var queryKey = decodeURIComponent(indexPair[0]).toLocaleLowerCase();
            var queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "").toLocaleLowerCase();
            if (queryKey == key) {
                value = queryValue;
            }
        });
        return value;
    };
    return ConsoleLogger;
}());
if (log) {
    log.loggers.push(new ConsoleLogger());
}
