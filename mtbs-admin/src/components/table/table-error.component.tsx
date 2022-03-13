import React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

const StyledDiv = styled.div`
  background-color: #fdcfc4;
  border: 1px solid #bb2611;
  border-radius: 4px;
  padding: 4px 12px;
`;

const TableError = (props: Props) => {
  const { text } = props;

  return <StyledDiv>{text}</StyledDiv>;
};

export default TableError;
