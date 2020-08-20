import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  padding: 4px 12px 0px 12px;
`;

const LogoWrapper = styled.div``;


export const BrandBar = () => {
  return (
    <Container>
      <LogoWrapper>
        <a href="https://www.mulberryhousesoftware.com/" rel="noopener noreferrer" target="_blank">
          <img height="32" src="assets/logo.svg" alt="Mulberry House Software" title="Mulberry House Software" />
        </a>
      </LogoWrapper>
    </Container>
  );
};
