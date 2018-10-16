/*

AddAzureWebAppDiagnostics(ILoggerFactory)
Adds an Azure Web Apps diagnostics logger.

AddAzureWebAppDiagnostics(ILoggerFactory, AzureAppServicesDiagnosticsSettings)
Adds an Azure Web Apps diagnostics logger.

AddConsole(ILoggerFactory)
Adds a console logger that is enabled for LogLevel.Information or higher.

AddConsole(ILoggerFactory, IConfiguration)
AddConsole(ILoggerFactory, IConsoleLoggerSettings)
AddConsole(ILoggerFactory, LogLevel)
Adds a console logger that is enabled for LogLevels of minLevel or higher.

AddConsole(ILoggerFactory, LogLevel, Boolean)
Adds a console logger that is enabled for LogLevels of minLevel or higher.

AddConsole(ILoggerFactory, Boolean)
Adds a console logger that is enabled for LogLevel.Information or higher.

AddConsole(ILoggerFactory, Func<String,LogLevel,Boolean>)
Adds a console logger that is enabled as defined by the filter function.

AddConsole(ILoggerFactory, Func<String,LogLevel,Boolean>, Boolean)
Adds a console logger that is enabled as defined by the filter function.

AddDebug(ILoggerFactory)
Adds a debug logger that is enabled for LogLevel.Information or higher.

AddDebug(ILoggerFactory, LogLevel)
Adds a debug logger that is enabled for LogLevels of minLevel or higher.

AddDebug(ILoggerFactory, Func<String,LogLevel,Boolean>)
Adds a debug logger that is enabled as defined by the filter function.

AddEventLog(ILoggerFactory)
Adds an event logger that is enabled for LogLevel.Information or higher.

AddEventLog(ILoggerFactory, EventLogSettings)
Adds an event logger. Use settings to enable logging for specific LogLevels.

AddEventLog(ILoggerFactory, LogLevel)
Adds an event logger that is enabled for LogLevels of minLevel or higher.

AddEventSourceLogger(ILoggerFactory)
Adds an event logger that is enabled for LogLevel.Information or higher.

CreateLogger(ILoggerFactory, Type)
Creates a new ILogger instance using the full name of the given type.

CreateLogger<T>(ILoggerFactory)
Creates a new ILogger instance using the full name of the given type.

AddTraceSource(ILoggerFactory, SourceSwitch)
AddTraceSource(ILoggerFactory, SourceSwitch, TraceListener)
AddTraceSource(ILoggerFactory, String)
AddTraceSource(ILoggerFactory, String, TraceListener)

*/ 
//# sourceMappingURL=ILoggerFactory.js.map