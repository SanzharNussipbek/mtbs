import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useAppSelector } from '../hooks';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { selectUser } from '../redux/user/user.selector';

import PostsList from '../components/posts-list/post-list.component';

export default function NewsScreen({ navigation }: RootTabScreenProps<'News'>) {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) return;
    navigation.navigate("Login")
  }, [user]);
  
  return (
    <View style={styles.container}>
      <PostsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
