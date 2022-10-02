var ElementRef = /** @class */ (function () {
    function ElementRef(el) {
        this.el = el;
        if (el === null) {
            throw new Error('Wrapped element is null');
        }
    }
    ElementRef.prototype.setInnerText = function (text) {
        if (this.el instanceof HTMLElement) {
            this.el.innerText = text;
        }
    };
    ElementRef.prototype.setInnerHTML = function (html) {
        if (this.el instanceof HTMLElement) {
            this.el.innerHTML = html;
        }
    };
    ElementRef.prototype.onClick = function (handle) {
        this.el.addEventListener('click', function () {
            handle();
        });
    };
    ElementRef.prototype.onChange = function (handle) {
        this.el.addEventListener('change', function () {
            handle();
        });
    };
    ElementRef.prototype.selectedFile = function () {
        if (this.el instanceof HTMLInputElement) {
            if (this.el.files !== null && this.el.files.length > 0) {
                this.el.files.item(0);
            }
        }
        return null;
    };
    ElementRef.prototype.reset = function () {
        if (this.el instanceof HTMLInputElement) {
            this.el.type = 'text';
            this.el.type = 'file';
        }
    };
    ElementRef.prototype.click = function () {
        if (this.el instanceof HTMLElement) {
            this.el.click();
        }
    };
    ElementRef.prototype.hide = function () {
        if (!this.el.classList.contains('hidden')) {
            this.el.classList.add('hidden');
        }
    };
    ElementRef.prototype.show = function () {
        this.el.classList.remove('hidden');
    };
    ElementRef.prototype.child = function (childId) {
        var child = this.el.querySelector("#".concat(childId));
        if (child === null) {
            throw new Error("Child not found: ".concat(childId));
        }
        else {
            return new ElementRef(child);
        }
    };
    ElementRef.prototype.childs = function (className) {
        var elements = this.el.getElementsByClassName(className);
        var childs = Array.from(elements);
        return childs.map(function (child) { return new ElementRef(child); });
    };
    return ElementRef;
}());
export default ElementRef;
