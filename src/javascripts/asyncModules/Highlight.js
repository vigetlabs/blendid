export default class Highlight {
  constructor(el) {
    this.el = el
    this.doit()
    this.el.classList.add('initialized')
  }

  doit() {
    this.el.style.backgroundColor = '#eb4a4c'
    this.el.style.color = '#fff'
  }
}
