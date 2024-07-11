import { render, act, userEvent, screen } from '../../test-utils'
import { ExampleButton } from './ExampleButton'

describe('ExampleButton test', () => {
  test('render', () => {
    render(<ExampleButton></ExampleButton>)
    expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    expect(screen.getByText(/World/i)).toBeInTheDocument()
  })

  test('act', async () => {
    await act(() => render(<ExampleButton />))

    const buttonElement = screen.getByText(/Hello World/i)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeInstanceOf(HTMLButtonElement)

    await act(async () => {
      await userEvent.click(buttonElement)
    })

    const clickedElement = screen.getByText(/Clicked/i)
    expect(clickedElement).toBeInTheDocument()
    expect(clickedElement).toBeInstanceOf(HTMLButtonElement)
  })

  test('without act', async () => {
    render(<ExampleButton />)

    const buttonElement = screen.getByText(/Hello World/i)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeInstanceOf(HTMLButtonElement)

    await userEvent.click(buttonElement)

    const clickedElement = screen.getByText(/Clicked/i)
    expect(clickedElement).toBeInTheDocument()
    expect(clickedElement).toBeInstanceOf(HTMLButtonElement)
  })
})
