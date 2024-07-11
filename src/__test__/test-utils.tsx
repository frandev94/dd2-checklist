/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanup, render, type RenderOptions } from '@testing-library/react'
export * from '@testing-library/react'

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })

export function suppressConsoleErrors() {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (shouldSuppress(...args)) {
        return
      }
      originalError(...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })
}

function shouldSuppress(...args: any[]) {
  // Customize this function to suppress specific errors
  // For example, suppressing XMLHttpRequest errors
  return args.some(
    arg => typeof arg === 'string' && arg.includes('XMLHttpRequest')
  )
}

export function defaultAfterEachAction() {
  cleanup()
}

// override render export
export { customRender as render }
export { default as userEvent } from '@testing-library/user-event'

// override afterEach to call defaultAfterEachAction by default
afterEach(defaultAfterEachAction)
