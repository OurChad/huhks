import React from "react";
import { graphql, navigate } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/Button";

const NavigationContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: 3rem;

    div {
        overflow: hidden;
    }

    div:last-child {
        text-align: right;
    };
`;


export default ({ data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const { title, next, nextLabel, previous, previousLabel } = frontmatter;
  const handleNavigation = route => () => {
    navigate(`/${route}`);
  };

  return (
    <Layout>
      <SEO title={title} />
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <NavigationContainer>
        <div>
          {previous
            && (
              <Button onClick={handleNavigation(previous)}>
Prev:
                {` `}
                {previousLabel}
              </Button>
            )
          }
        </div>
        <div>
          {
            next
          && (
            <Button onClick={handleNavigation(next)}>
Next:
              {` `}
              {nextLabel}
            </Button>
          )
          }
        </div>
      </NavigationContainer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        next,
        nextLabel,
        previous,
        previousLabel,
      }
    }
  }
`;
