import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 24,
    width: '100%',
  },
  poster: {
    height: '100%',
    width: 80,
    marginRight: 8,
  },
  img: {
    width: '100%',
    height: 105,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    flex: 1,
  },
  text: {
    width: '100%',
    maxWidth: '100%',
    flex: 1,
  },
  body: {
    flex: 1,
    fontSize: 14,
  },
  skeletonContainer: {
    position: 'relative',
  },
  skeleton: {
    width: '100%',
    height: 105,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});