import React from "react";
import FaqList from "../faq-list/faq-list.component";
import { Styled } from "./faq-view.styles";

const FaqView: React.FC = () => {
  return (
    <Styled.Container>
      <FaqList />
    </Styled.Container>
  );
};

export default FaqView;
