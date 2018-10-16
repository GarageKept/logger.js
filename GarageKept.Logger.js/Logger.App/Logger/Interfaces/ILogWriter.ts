interface ILogWriter {
    // Internal Name of Logger
    name: string;

    // Minimum LogLevel
    minLevel: LogLevel;

    // Is logger enabled
    isEnabled(logLevel: LogLevel): Boolean;

    // This is where the real work is done
    log(logLevel: LogLevel, message: string, error: Error, scope: string);
}