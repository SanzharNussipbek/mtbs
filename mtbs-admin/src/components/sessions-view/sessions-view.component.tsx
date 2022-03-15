import React from 'react';
import SessionsList from '../sessions-list/sessions-list.component';
import { Styled } from './sessions-view.styles';

const SessionsView: React.FC = () => {
  return (
    <Styled.Container>
      <SessionsList />
    </Styled.Container>
  );
};

export default SessionsView;
