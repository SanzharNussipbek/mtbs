import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poster: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 32,
  },
  img: {
    height: 600,
    width: "100%",
    marginBottom: 8,
  },
  block: {
    flexDirection: "column",
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 16,
  },
  descriptionBtn: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 1,
    height: 30,
    fontSize: 12,
    fontWeight: "400",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
  },
  infoText: {
    fontSize: 14,
  },
});
