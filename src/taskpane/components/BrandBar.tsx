import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 4px 12px;
`;

const LogoWrapper = styled.div``;

const BrandBar = () => {
  return (
    <Container>
      <LogoWrapper>
        <a href="https://www.mulberryhousesoftware.com/">
          <img height="48" src="assets/logo.svg" alt="Mulberry House Software" title="Mulberry House Software" />
        </a>
      </LogoWrapper>
    </Container>
  );
};

export default BrandBar;
