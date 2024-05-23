import React from "react";
import { Container } from "react-bootstrap";

import TopHeader from '../components/common_components/TopHeader';
import MainHeader from '../components/common_components/MainHeader';
import Footer from '../components/common_components/Footer';

const CommonLayout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <main >
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default CommonLayout;
