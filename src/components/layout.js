/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Header from '../components/Header'; // eslint-disable-line

const MainContentContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 3rem;
  max-width: 960;
  padding: 0px 1rem 1.5rem;
  min-height: 75vh;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <MainContentContainer>
        <main>{children}</main>
      </MainContentContainer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
