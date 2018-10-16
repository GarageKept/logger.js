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
