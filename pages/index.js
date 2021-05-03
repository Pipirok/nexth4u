import Head from "next/head";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Test app</title>
      </Head>
      <Container className="">
        <img
          referrerPolicy="same-origin"
          src="https://t.nhentai.net/galleries/1239337/cover.jpg"
          width="100%"
        />
      </Container>
    </div>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
