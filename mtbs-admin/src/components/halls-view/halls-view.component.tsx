import React from 'react';
import HallsList from '../halls-list/halls-list.component';
import { Styled } from './halls-view.styles';

const HallsView: React.FC = () => {
  return (
    <Styled.Container>
      <HallsList />
    </Styled.Container>
  );
};

export default HallsView;
