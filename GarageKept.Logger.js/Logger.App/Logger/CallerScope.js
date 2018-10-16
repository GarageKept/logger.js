/// <reference path="../Logger/Logger.ts"/>
var CallerScope = /** @class */ (function () {
    function CallerScope() {
        this.scope = this.getCaller();
        this.childScope = null;
    }
    CallerScope.prototype.add = function (scope) {
        if (this.childScope == null) {
            this.childScope = scope;
        }
        else {
            this.childScope.add(scope);
        }
    };
    CallerScope.prototype.remove = function (scope) {
        if (this.childScope != null) {
            if (this.childScope.toString() === scope.toString()) {
                this.childScope = null;
            }
            else {
                this.childScope.remove(scope);
            }
        }
    };
    CallerScope.prototype.getCaller = function () {
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
    CallerScope.prototype.toString = function () {
        if (this.childScope != null) {
            return this.scope + "\\" + this.childScope.toString();
        }
        else {
            return this.scope;
        }
    };
    return CallerScope;
}());
