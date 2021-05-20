import { useState, useEffect } from "react";
import {
  Row,
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Col,
  Form,
  Badge,
} from "reactstrap";
import Head from "next/head";

import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";

export default function index() {
  const [source, changeSource] = useState("random");
  const [inputValue, changeInputValue] = useState();
  const [blacklistedTags, changeBlacklistedTags] = useState("");

  const [successText, changeSuccessText] = useState("");
  const [blacklist, changeBlacklist] = useState(null);

  const onChange = (e) => {
    changeInputValue(e.target.value);
    let src = parseInt(e.target.value);
    isNaN(src) ? changeSource("random") : changeSource(src);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    location = `view/${source}`;
  };

  const onBlacklistedTagsChange = (e) => {
    changeBlacklistedTags(e.target.value);
  };

  const saveBlacklistedTags = (e) => {
    e.preventDefault();
    changeSuccessText("Saving...");
    localStorage.setItem(
      "blacklistedTags",
      JSON.stringify(Array.from(new Set(blacklistedTags.split(/, */g))))
    );
    changeSuccessText("Saved succesfully!");
    changeBlacklist(JSON.parse(localStorage.getItem("blacklistedTags")));
  };

  useEffect(() => {
    changeBlacklist(JSON.parse(localStorage.getItem("blacklistedTags")));
  }, []);

  return (
    <>
      <Head>
        <title>View a doujin - hentai4u</title>
      </Head>
      <Topbar />
      <main>
        <Container className="text-white pt-4">
          <Row style={{ justifyContent: "flex-start" }}>
            <Col xs={12} lg={6}>
              <h1 className="h1 display-4">View</h1>
              <p>Enter the sauce you want to view, and hit the "View"!</p>
              <Form onSubmit={onSubmit}>
                <InputGroup>
                  <Input type="text" value={inputValue} onChange={onChange} />
                  <InputGroupAddon addonType="append">
                    <Button
                      className="pl-3 pr-3"
                      onClick={onSubmit}
                      color="secondary"
                    >
                      View
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <hr className="d-xs-block d-md-none bg-white mt-5" />
            </Col>
            <Col xs={12} lg={6}>
              <h2 className="h2 display-4">Blacklist</h2>
              <p>Enter tags you want to blacklist (separated by a comma)</p>
              <Form onSubmit={saveBlacklistedTags}>
                <InputGroup>
                  <Input
                    type="text"
                    value={blacklistedTags}
                    onChange={onBlacklistedTagsChange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      className="pl-3 pr-3"
                      onClick={saveBlacklistedTags}
                      value={blacklistedTags}
                      color="secondary"
                    >
                      Save
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>

              <h2 className="h2 text-success">{successText}</h2>
              {blacklist && (
                <>
                  <h3 className="h3">Currently blacklisted: </h3>
                  <Row
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    {blacklist.map((tag, i) => (
                      <Badge color="primary" className="p-2 ml-2" pill>
                        {tag}
                      </Badge>
                    ))}
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}
