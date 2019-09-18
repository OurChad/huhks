import React from "react";
import { Link } from "gatsby";
import PageLayout from "../components/PageLayout";
import SEO from "../components/SEO";

const IndexPage = () => (
  <PageLayout>
    <SEO title="Home" />
    <h1>🤔 I'm not sure how you got here, but click the link below to begin.</h1>
    <Link to="/what-are-hooks/">Go to page 2</Link>
  </PageLayout>
);

export default IndexPage;
