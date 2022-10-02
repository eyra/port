export default class ElementRef {
    el: Element;
    constructor(el: Element);
    setInnerText(text: string): void;
    setInnerHTML(html: string): void;
    onClick(handle: () => void): void;
    onChange(handle: () => void): void;
    selectedFile(): File | null;
    reset(): void;
    click(): void;
    hide(): void;
    show(): void;
    child(childId: string): ElementRef;
    childs(className: string): ElementRef[];
}
