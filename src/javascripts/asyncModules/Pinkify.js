export default class Pinkify {
  constructor(el) {
    this.el = el
    this.doit()
    this.el.classList.add('initialized')
  }

  doit() {
    this.el.style.backgroundColor = '#ff6bae'
    this.el.style.color = '#fff'
  }
}
