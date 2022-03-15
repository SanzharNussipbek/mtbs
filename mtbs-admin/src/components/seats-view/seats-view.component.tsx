import React from 'react';
import SeatsList from '../seats-list/seats-list.component';
import { Styled } from './seats-view.styles';

const SeatsView: React.FC = () => {
  return (
    <Styled.Container>
      <SeatsList />
    </Styled.Container>
  );
};

export default SeatsView;
