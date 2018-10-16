class Scope{
    name: string;
    childScope: Scope;

    constructor(name: string) {
        this.name = name;
        this.childScope = null;
    }

    add(scope: Scope): void {
        if (this.childScope == null) {
            this.childScope = scope;
        } else {
            this.childScope.add(scope);
        }
    }

    remove(scope: Scope): void {
        if (this.childScope != null) {
            if (this.childScope.toString() === scope.toString()) {
                this.childScope = null;
            } else {
                this.childScope.remove(scope);
            }
        }
    }

    toString(): string {
        if (this.childScope != null) {
            return this.name + "\\" + this.childScope.toString();
        } else {
            return this.name;
        }
    }
}