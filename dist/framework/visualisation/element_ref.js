export default class ElementRef {
    el;
    constructor(el) {
        this.el = el;
        if (el === null) {
            throw new Error('Wrapped element is null');
        }
    }
    setInnerText(text) {
        if (this.el instanceof HTMLElement) {
            this.el.innerText = text;
        }
    }
    setInnerHTML(html) {
        if (this.el instanceof HTMLElement) {
            this.el.innerHTML = html;
        }
    }
    onClick(handle) {
        this.el.addEventListener('click', () => {
            handle();
        });
    }
    onChange(handle) {
        this.el.addEventListener('change', () => {
            handle();
        });
    }
    selectedFile() {
        if (this.el instanceof HTMLInputElement) {
            if (this.el.files !== null && this.el.files.length > 0) {
                this.el.files.item(0);
            }
        }
        return null;
    }
    reset() {
        if (this.el instanceof HTMLInputElement) {
            this.el.type = 'text';
            this.el.type = 'file';
        }
    }
    click() {
        if (this.el instanceof HTMLElement) {
            this.el.click();
        }
    }
    hide() {
        if (!this.el.classList.contains('hidden')) {
            this.el.classList.add('hidden');
        }
    }
    show() {
        this.el.classList.remove('hidden');
    }
    child(childId) {
        const child = this.el.querySelector(`#${childId}`);
        if (child === null) {
            throw new Error(`Child not found: ${childId}`);
        }
        else {
            return new ElementRef(child);
        }
    }
    childs(className) {
        const elements = this.el.getElementsByClassName(className);
        const childs = Array.from(elements);
        return childs.map((child) => new ElementRef(child));
    }
}
