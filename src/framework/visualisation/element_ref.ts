export default class ElementRef {
  el: Element

  constructor (el: Element) {
    this.el = el

    if (el === null) {
      throw new Error('Wrapped element is null')
    }
  }

  setInnerText (text: string): void {
    if (this.el instanceof HTMLElement) {
      this.el.innerText = text
    }
  }

  setInnerHTML (html: string): void {
    if (this.el instanceof HTMLElement) {
      this.el.innerHTML = html
    }
  }

  onClick (handle: () => void): void {
    this.el.addEventListener('click', () => {
      handle()
    })
  }

  onChange (handle: () => void): void {
    this.el.addEventListener('change', () => {
      handle()
    })
  }

  selectedFile (): File | null {
    if (this.el instanceof HTMLInputElement) {
      if (this.el.files !== null && this.el.files.length > 0) {
        this.el.files.item(0)
      }
    }
    return null
  }

  reset (): void {
    if (this.el instanceof HTMLInputElement) {
      this.el.type = 'text'
      this.el.type = 'file'
    }
  }

  click (): void {
    if (this.el instanceof HTMLElement) {
      this.el.click()
    }
  }

  hide (): void {
    if (!this.el.classList.contains('hidden')) {
      this.el.classList.add('hidden')
    }
  }

  show (): void {
    this.el.classList.remove('hidden')
  }

  child (childId: string): ElementRef {
    const child = this.el.querySelector(`#${childId}`)
    if (child === null) {
      throw new Error(`Child not found: ${childId}`)
    } else {
      return new ElementRef(child)
    }
  }

  childs (className: string): ElementRef[] {
    const elements = this.el.getElementsByClassName(className)
    const childs = Array.from(elements)
    return childs.map((child) => new ElementRef(child))
  }
}
