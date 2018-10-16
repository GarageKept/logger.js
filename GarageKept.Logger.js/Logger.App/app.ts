class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        log.beginScope(() => {
            log.logTrace("Test2");
            this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
        });
    }

    stop() {
        log.beginScope(() => {
            log.logTrace("Test3");
            clearTimeout(this.timerToken);
        });
    }
}

window.onload = () => {
    log.beginScope(() => {

        log.logTrace("trace test");

        let txt: string = "This is constructor text";

        log.beginNamedScope("inline Scope", () => {
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
