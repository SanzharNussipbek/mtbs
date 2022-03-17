import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MoviesList from '../components/movies-list/movies-list.component';

import { useAppSelector } from '../hooks';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { selectUser } from '../redux/user/user.selector';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) return;
    navigation.navigate("Login")
  }, [user]);
  
  return (
    <View style={styles.container}>
      <MoviesList />
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
