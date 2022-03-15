import React from 'react';
import PostList from '../post-list/post-list.component';
import { Styled } from './posts-view.styles';

const PostsView: React.FC = () => {
  return (
    <Styled.Container>
      <PostList />
    </Styled.Container>
  );
};

export default PostsView;
