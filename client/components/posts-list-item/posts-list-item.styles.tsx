import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 24,
  },
  img: {
    height: 100,
    width: 80,
    marginRight: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    flex: 1,
    width: 250,
  },
  text: {
    flexDirection: 'column',
  },
  body: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
    width: 250,
  },
});