import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { BASE_URL } from '../../utils/consts'
import { classNames } from '../../utils/components'

export default function NavigationBar({ className }: { className?: string }) {
  const path = window.location.pathname
  const links = [
    { url: BASE_URL + '/', name: 'Home' },
    { url: BASE_URL + '/checklist', name: 'Checklist' },
    { url: BASE_URL + '/map', name: 'Map' },
    { url: BASE_URL + '/about', name: 'About' },
  ]
  const home = links.find(link => link.name === 'Home') ?? links[0]

  const isActive = (linkUrl: string) => {
    const linkPath = new URL(linkUrl, window.location.origin).pathname
    return path === linkPath
  }

  return (
    <Navbar expand='md' className={classNames(className)}>
      <Container>
        <Navbar.Brand href={home.url}>
          <Image
            src={BASE_URL + '/images/icon.png'}
            height='34'
            width='40'
            className='d-inline-block align-top me-2'
            alt='React Bootstrap logo'
          />
          <span>Cheatsheet</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {links.map(({ url, name }) => (
              <Nav.Link key={url} href={url} active={isActive(url)}>
                {name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
