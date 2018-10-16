<h1>
    logger.js
</h1>

<div>
    logger.js was written as a way to decouple log writing in applications from the act of writing the logs out to either the console or to persistant storage. I wanted to be able to change out/add new log writers without having to update every application that I wrote.
</div>
<div>
   loger.js allows you to write standard log.logTrace('message'); code without worrying about where the log is written to. There is even support for scopes. 
</div>
<pre>
    log.beginNamedScope('MyFunction', () =>{
        // Your code here
    });
</pre>
<div>
    The above code will prefix all of your log messages with the scope 'MyFunction', allowing you to log relevant messages focusing on the information you need delivered and let the framework handle wrapping each message with the location information. log.BeginScope will attempt to use an error.stack information to determine the calling function but this is slower than providing a named scope.
</div>
<div>
    logger.js is fully extensible from the start. The console module is already provided to write effective logs to the console from the start. If you need additional modules, such as application insights, add them in, configure them as you need and go.
</div>
<div>
    Need a logging source not currently available, roll your own by following our examples.
<div>
