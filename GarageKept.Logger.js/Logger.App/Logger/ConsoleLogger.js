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
