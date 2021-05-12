import Link from "next/link";
import { Container } from "reactstrap";

export default function Footer() {
  return (
    <footer>
      <Container
        fluid
        className="d-flex flex-column text-white text-center p-md-5 p-4"
        style={{ backgroundColor: "black" }}
      >
        <h3 className="h3">
          Made by <Link href="https://github.com/Pipirok">Pipirok</Link>
        </h3>
      </Container>
    </footer>
  );
}
