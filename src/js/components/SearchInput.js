import BaseComponent from './BaseComponent'

export default class SearchInput extends BaseComponent {
  constructor(handlers, submitCallback, nodes) {
    super(handlers)
    
    this.submitCallback = submitCallback
    this.invalidities = []
    this.input = nodes.input
    this.button = nodes.button.node
    this.buttonClass = nodes.button.class
    this.activeSearch = null
  }

  block() {
    this.input.disabled = true
    this.button.disabled = true
    this.button.classList.add(this.buttonClass + '_disabled')
  }

  unblock() {
    this.input.disabled = true
    this.button.disabled = true
    this.button.classList.remove(this.buttonClass + '_disabled')
  }

  setValue(value) {
    this.input.value = value
    this.checkValidity()
  }

  checkValidity(isSubmit) {
    this.invalidities = []
    this.button.classList.remove(this.buttonClass + '_disabled')
    this.input.setCustomValidity('')

    const validity = this.input.validity

    if (validity.valueMissing || !this.input.value.trim())
      this.invalidities.push('Поле обязательно для заполнения')
    else {
      if (validity.tooLong)
        this.invalidities.push(
          `Слишком длинно. Максимальная длинна: ${this.input.maxLength}`
        )

      if (validity.tooShort)
        this.invalidities.push(
          `Слишком коротко. Минимальная длинна: ${this.input.minLength}`
        )

      if (validity.badInput) this.invalidities.push(`Ошибка`)
    }

    if (this.invalidities.length) {
      this.input.setCustomValidity(this.invalidities.join('. \n'))
      this.input.reportValidity()
      this.button.classList.add(this.buttonClass + '_disabled')
    } else if (isSubmit) {
      this.submitCallback(this.input.value)
    }
  }
}
