import { type ReactNode, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

interface Props {
  children?: ReactNode | ReactNode[]
  title: string
  buttonText: string | ReactNode
}
function OffMenu({ children, title, buttonText }: Props) {
  const [show, setShow] = useState(false)

  const handleToggle = () => setShow(s => !s)

  return (
    <>
      <Button className='' variant='light' onClick={handleToggle}>
        {buttonText ?? 'Show'}
      </Button>

      <Offcanvas
        show={show}
        placement='end'
        onHide={handleToggle}
        scroll
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffMenu
