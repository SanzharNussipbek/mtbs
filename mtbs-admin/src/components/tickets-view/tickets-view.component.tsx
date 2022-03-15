import React from 'react';
import TicketsList from '../tickets-list/tickets-list.component';
import { Styled } from './tickets-view.styles';

const TicketsView: React.FC = () => {
  return (
    <Styled.Container>
      <TicketsList />
    </Styled.Container>
  );
};

export default TicketsView;
