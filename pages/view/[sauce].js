import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row, Collapse, Button, Badge } from "reactstrap";
import { PacmanLoader } from "react-spinners";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";

import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";

import scrape from "../../helpers/scrape";
import Link from "next/link";
import Head from "next/head";

export default function View(props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    let blacklistedTags =
      JSON.parse(localStorage.getItem("blacklistedTags")) || [];

    blacklistedTags.forEach((tag) => {
      if (props.tags?.includes(tag)) {
        setIsOpen(false);
      }
    });
  }, [props.tags]);

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <Topbar />
        <main>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <PacmanLoader
              color="purple"
              loading={true}
              size="2rem"
              css="display: block; margin-left: auto; margin-right: auto;"
            />
          </div>
        </main>
        <Footer />
      </>
    );

  if (props.noDoujin)
    return (
      <>
        <Head>
          <title>No doujin found at sauce {props.sauce}</title>
        </Head>
        <Topbar />
        <main>
          <Container className="pt-4 text-white">
            <h1 className="h1 display-3">
              No doujin found at{" "}
              <span className="text-primary">{props.sauce}</span>
            </h1>
          </Container>
        </main>
        <Topbar />
      </>
    );
  else
    return (
      <>
        <Head>
          <title>{props.title}</title>
        </Head>
        <Topbar />
        <main>
          <Container className="pt-4 pb-4 text-white">
            {!isOpen && (
              <>
                <h1 className="h1 display-4">Warning</h1>
                <p>This doujin has one or more blacklisted tags</p>
                <Button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  color="primary"
                >
                  View anyway
                </Button>
                <hr className="bg-white" />
              </>
            )}
            <Collapse isOpen={isOpen}>
              <Row>
                <h2 className="h2 text-center w-100 pt-3">{props.pretty}</h2>
              </Row>
              <Row>
                <Col className="pt-4" md={5} lg={4} sm={6} xs={12}>
                  <img
                    className="img-fluid align-self-center"
                    src={props.image}
                    referrerPolicy="same-origin"
                  />
                </Col>
                <Col className="pt-4" md={7} lg={8} sm={6} xs={12}>
                  <p className="lead text-info"># {props.sauce}</p>
                  <p className="lead">{props.title}</p>
                  {props.tags?.length !== 0 && (
                    <div>
                      <h3 className="h3">Tags: </h3>
                      {props.tags.map((tag, i) => (
                        <Badge key={i} color="primary" pill className="ml-1">
                          {tag}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </div>
                  )}
                  {props.parodies?.length !== 0 && (
                    <>
                      <h3 className="h3">Parodies: </h3>
                      {props.parodies.map((par, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {par}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </>
                  )}
                  {props.characters?.length !== 0 && (
                    <>
                      <h3 className="h3">Characters: </h3>
                      {props.characters.map((char, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {char}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </>
                  )}
                  {props.artists?.length !== 0 && (
                    <>
                      <h3 className="h3">Artists: </h3>

                      {props.artists.map((artist, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {artist}
                        </Badge>
                      ))}

                      <hr className="bg-white" />
                    </>
                  )}
                  {props.groups?.length !== 0 && (
                    <>
                      <h3 className="h3">Groups: </h3>
                      {props.groups.map((group, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {group}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </>
                  )}
                  {props.languages?.length !== 0 && (
                    <>
                      <h3 className="h3">Languages: </h3>
                      {props.languages.map((lang, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {lang}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </>
                  )}
                  {props.categories?.length !== 0 && (
                    <>
                      <h3 className="h3">Categories: </h3>
                      {props.categories.map((cat, i) => (
                        <Badge
                          key={i}
                          color="primary"
                          pill
                          className="p-2 ml-1 mt-1"
                        >
                          {cat}
                        </Badge>
                      ))}
                      <hr className="bg-white" />
                    </>
                  )}
                  <Row>
                    <h3 className="h3 p-2">Uploaded {props.uploadDate}</h3>
                  </Row>
                </Col>
              </Row>
              <hr className="bg-white" />
              <SimpleReactLightbox>
                <Container fluid>
                  <SRLWrapper options={{ thumbnails: props.thumbnails }}>
                    <Row>
                      {props.pages.map((page, i) => (
                        <Col
                          className="mt-2"
                          xs={6}
                          md={4}
                          lg={3}
                          xl={2}
                          key={i}
                        >
                          <img
                            src={page}
                            referrerPolicy="same-origin"
                            alt={`Page ${i + 1} out of ${props.pageAmount}`}
                            className="img-thumbnail"
                          />
                        </Col>
                      ))}
                    </Row>
                  </SRLWrapper>
                </Container>
              </SimpleReactLightbox>
            </Collapse>
            <Link href="/view">
              <Button>View another doujin</Button>
            </Link>
          </Container>
        </main>
        <Footer />
      </>
    );
}

export async function getStaticProps({ params }) {
  const response = await scrape(params.sauce);
  return {
    props: response,
  };
}

export async function getStaticPaths() {
  const paths = [...Array(100)].map((e, i) => ({
    params: { sauce: `${i + 1}` },
  }));

  return {
    paths,
    fallback: true,
  };
}
