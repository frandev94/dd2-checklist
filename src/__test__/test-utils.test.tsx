import { userEvent, act, render, screen } from './test-utils'

describe('Testing utils', () => {
  test('is exported utils defined', () => {
    expect(userEvent).toBeDefined()
    expect(act).toBeDefined()
    expect(render).toBeDefined()
  })

  test('userEvent', async () => {
    render(<button>Hello World</button>)
    const element = screen.getByText(/Hello/i)
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Hello')
    expect(element).toHaveTextContent('World')

    element.addEventListener('mouseover', () => {
      element.classList.add('overed')
    })
    await userEvent.hover(element)
    expect(element).toHaveClass('overed')

    element.addEventListener('click', () => {
      element.classList.add('clicked')
    })
    await userEvent.click(element)
    expect(element).toHaveClass('clicked')
  })
})
