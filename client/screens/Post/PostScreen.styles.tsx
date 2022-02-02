import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  backButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 70,
    height: 40,
    width: 90,
    justifyContent: 'flex-start',
    zIndex: 6,
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -50,
    height: 114,
    paddingTop: 64,
    zIndex: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.65)",
  },
  poster: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'justify',
    lineHeight: 24,
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
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
  },
  infoText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#db2777',
  },
});
