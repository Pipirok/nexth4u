import Link from "next/link";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Container,
} from "reactstrap";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" dark expand="md">
      <Container>
        <NavbarBrand href="/">hentai4u</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Link href="/view" passHref>
                <NavLink>View</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Pipirok/next-h4u">
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
