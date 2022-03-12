import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Styled from './loader.styles';

import cnms from 'classnames';

interface Props {
  fullscreen?: boolean;
  absolute?: boolean;
}

const Loader = (props: Props) => {
  const { fullscreen, absolute } = props;

  return (
    <Styled.Container className={cnms({ fullscreen, absolute })}>
      <CircularProgress />
    </Styled.Container>
  );
};

export default Loader;
