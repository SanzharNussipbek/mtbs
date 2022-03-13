import React from 'react';
import UserList from '../user-list/user-list.component';
import { Styled } from './users-view.styles';

const UsersView: React.FC = () => {
  return (
    <Styled.Container>
      <UserList />
    </Styled.Container>
  );
};

export default UsersView;
