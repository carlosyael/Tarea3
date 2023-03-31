class Calculator {
  // Constructor que recibe los elementos de texto del HTML
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  // Método que inicializa las propiedades de la instancia
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  // Método que elimina el último dígito del operando actual
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // Método que agrega un número al operando actual
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // Método que elige una operación y guarda el operando actual como el anterior
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  // Método que realiza el cálculo según la operación y los operandos
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    }
  // Método que formatea un número
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  // Método que actualiza los elementos de texto del HTML
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}
  
// Seleccionar los elementos del HTML
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-po]')
const currentOperandTextElement = document.querySelector('[data-co]')

// Crear una instancia de la clase Calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Agregar eventos a los botones de los números
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// Agregar eventos a los botones de las operaciones
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// Agregar evento al botón de igual
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

// Agregar evento al botón de borrar todo
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

// Agregar evento al botón de borrar el último dígito
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
