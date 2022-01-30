import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 150,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  img: {
    height: 280,
    width: '100%',
    marginBottom: 8,
    borderRadius: 4,
  },
  skeletonContainer: {
    position: 'relative',
  },
  skeleton: {
    height: 280,
    width: '100%',
    marginBottom: 8,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});