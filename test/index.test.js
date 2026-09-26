/**
 * @jest-environment jsdom
 */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit
} = require('../index')

describe('DOM Testing and User Behavior Simulation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="simulate-click">Simulate Click</button>
      <form id="user-form">
        <input type="text" id="user-input" placeholder="Enter text">
        <button type="submit">Submit</button>
      </form>
      <div id="dynamic-content"></div>
      <div id="error-message" class="hidden"></div>
    `
  })

  describe('addElementToDOM', () => {
    test('updates the DOM content of the given container', () => {
      addElementToDOM('dynamic-content', 'Hello World')

      const container = document.getElementById('dynamic-content')
      expect(container.innerHTML).toBe('Hello World')
    })

    test('does nothing if the container does not exist', () => {
      expect(() => addElementToDOM('non-existent', 'Hello World')).not.toThrow()
    })
  })

  describe('removeElementFromDOM', () => {
    test('removes an element from the DOM', () => {
      expect(document.getElementById('simulate-click')).not.toBeNull()

      removeElementFromDOM('simulate-click')

      expect(document.getElementById('simulate-click')).toBeNull()
    })

    test('does nothing if the element does not exist', () => {
      expect(() => removeElementFromDOM('non-existent')).not.toThrow()
    })
  })

  describe('simulateClick', () => {
    test('updates the DOM correctly when triggered', () => {
      simulateClick('dynamic-content', 'Button Clicked!')

      const container = document.getElementById('dynamic-content')
      expect(container.innerHTML).toBe('Button Clicked!')
    })
  })

  describe('handleFormSubmit', () => {
    test('updates the DOM with valid input', () => {
      const input = document.getElementById('user-input')
      input.value = 'Test Task'

      handleFormSubmit('user-form', 'dynamic-content')

      const container = document.getElementById('dynamic-content')
      const errorMessage = document.getElementById('error-message')

      expect(container.innerHTML).toBe('Test Task')
      expect(errorMessage.textContent).toBe('')
      expect(errorMessage.classList.contains('hidden')).toBe(true)
    })

    test('shows an error for empty input', () => {
      const input = document.getElementById('user-input')
      input.value = ''

      handleFormSubmit('user-form', 'dynamic-content')

      const container = document.getElementById('dynamic-content')
      const errorMessage = document.getElementById('error-message')

      expect(errorMessage.textContent).toBe('Input cannot be empty')
      expect(errorMessage.classList.contains('hidden')).toBe(false)
      expect(container.innerHTML).toBe('')
    })

    test('shows an error for whitespace-only input', () => {
      const input = document.getElementById('user-input')
      input.value = '   '

      handleFormSubmit('user-form', 'dynamic-content')

      const errorMessage = document.getElementById('error-message')
      expect(errorMessage.textContent).toBe('Input cannot be empty')
      expect(errorMessage.classList.contains('hidden')).toBe(false)
    })
  })
})