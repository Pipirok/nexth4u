import Head from "next/head";
import Link from "next/link";
import { Container, Button, List } from "reactstrap";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>hentai4u - a doujin viewer</title>
      </Head>
      <Topbar />
      <main>
        <Container className="pt-5 pb-5 text-white">
          <h1 className="h1 display-4">
            Welcome to <span className="text-primary">hentai4u</span>
          </h1>
          <p className="lead">
            All new features are going to be displayed here.
          </p>
          <p className="h4">Features so far:</p>
          <Link href="/view">
            <Button color="secondary">View a doujin</Button>
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
