import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>🤔 I'm not sure how you got here, but click the link below to begin.</h1>
    <Link to="/what-are-hooks/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
