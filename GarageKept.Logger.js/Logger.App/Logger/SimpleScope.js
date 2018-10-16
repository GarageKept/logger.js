var SimpleScope = /** @class */ (function () {
    function SimpleScope(name) {
        this.scope = name;
        this.childScope = null;
    }
    SimpleScope.prototype.add = function (scope) {
        if (this.childScope == null) {
            this.childScope = scope;
        }
        else {
            this.childScope.add(scope);
        }
    };
    SimpleScope.prototype.remove = function (scope) {
        if (this.childScope != null) {
            if (this.childScope.toString() === scope.toString()) {
                this.childScope = null;
            }
            else {
                this.childScope.remove(scope);
            }
        }
    };
    SimpleScope.prototype.toString = function () {
        if (this.childScope != null) {
            return this.scope + "\\" + this.childScope.toString();
        }
        else {
            return this.scope;
        }
    };
    return SimpleScope;
}());
