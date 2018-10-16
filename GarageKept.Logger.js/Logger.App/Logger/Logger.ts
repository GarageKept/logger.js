/// <reference path="../Logger/LogLevel.ts"/>
/// <reference path="../Logger/Scope.ts"/>

class Logger {

    loggers: ILogWriter[];

    scope: Scope;

    constructor() {
        this.loggers = new Array<ILogWriter>();
        this.scope = null;
    }
    
    private setScope(scope: Scope): Scope {
        if (this.scope == null) {
            this.scope = scope;
        } else {
            this.scope.add(scope);
        }

        return scope;
    }

    private removeScope(s: Scope) {
        if (this.scope != null) {
            if (this.scope === s) {
                this.scope = null;
            } else {
                this.scope.remove(s);
            }
        }
    }

    private getCaller(): string {
        let txt: string = "-";

        try {
            throw new Error();
        }
        catch (e) {
            try {
                txt = e.stack.split('at ')[3].split(' ')[0];
            } catch (e) {
                txt = "--";
            }
        }

        return txt;
    }

    beginScope(func: () => void) {
        this.beginNamedScope(this.getCaller(), func);
    }

    beginNamedScope(scope: string, func: () => void) {

        let simpleScope = new Scope(scope);

        try {
            if (log) {
                log.setScope(simpleScope);
                func();
            }
        } finally {
            log.removeScope(simpleScope);
        }
    }

    SetGlobalMinLevel(logLevel: LogLevel) {
        for (let i = 0; i < this.loggers.length; i++) {
            this.loggers[i].minLevel = logLevel;
        }
    }

    SetMinLogLevel(name: string, logLevel: LogLevel) {
        for (let i = 0; i < this.loggers.length; i++) {
            if (this.loggers[i].name == name) {
                this.loggers[i].minLevel = logLevel;
            }
        }
    }

    logTrace(message: string, error?: Error): void {
        this.log(LogLevel.Trace, message, error);
    }

    logDebug(message: string, error?: Error): void {
        this.log(LogLevel.Debug, message, error);
    }

    logInformation(message: string, error?: Error): void {
        this.log(LogLevel.Information, message, error);
    }

    logWarning(message: string, error?: Error): void {
        this.log(LogLevel.Warning, message, error);
    }

    logError(message: string, error?: Error): void {
        this.log(LogLevel.Error, message, error);
    }

    logCritical(message: string, error?: Error): void {
        this.log(LogLevel.Critical, message, error);
    }

    log(logLevel: LogLevel, message: string, error: Error): void {        
        let scopeString: string = "";
        if (this.scope == null) {
            scopeString += this.getCaller();
        } else {
            scopeString += this.scope.toString();
        }

        for (let i = 0; i < this.loggers.length; i++) {
            if (this.loggers[i].isEnabled(logLevel)) {
                this.loggers[i].log(logLevel, message, error, scopeString);
            }
        }
    }
}

var log = new Logger();