/// <reference path="../Logger/Logger.ts"/>

class ConsoleLogger implements ILogWriter {
    name: string = "ConsoleLogger";

    minLevel: LogLevel;

    constructor(logLevel?: LogLevel) {
        if (logLevel == null) {
            this.minLevel = LogLevel.Warning;
        } else {
            this.minLevel = logLevel;
        }
    }

    isEnabled(logLevel: LogLevel): Boolean {

        let isEnabled: boolean = false;
        let num: number = Number(this.parseQueryString("loglevel"));

        if (num >= 6) {
            isEnabled = this.minLevel <= logLevel;
        } else {
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
    }

    log(logLevel: LogLevel, message: string, error: Error, scope: string) {
        if (this.isEnabled(logLevel)) {
            let style = "background: #222; color: #bada55";

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
    }

    logLevelToString(logLevel: LogLevel): string {
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
    }

    private parseQueryString(key: string): string {
        let queryString = window.location.search.substring(1);
        let value = "100";
        let queries: string[] = queryString.split("&");

        queries.forEach((indexQuery: string) => {
            var indexPair = indexQuery.split("=");

            var queryKey: string = decodeURIComponent(indexPair[0]).toLocaleLowerCase();
            var queryValue: string = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "").toLocaleLowerCase();

            if (queryKey == key) {
                value = queryValue;
            }
        });

        return value;
    }
}

if (log) {
    log.loggers.push(new ConsoleLogger());
}