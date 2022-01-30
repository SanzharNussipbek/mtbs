import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 8,
    paddingVertical: 16,
    position: "relative",
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
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  hero: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 16,
  },
  poster: {
    position: "relative",
    flexDirection: "column",
    width: "100%",
  },
  img: {
    height: 600,
    borderRadius: 16,
    transform: [
      {
        translateY: -50,
      },
    ],
    width: "100%",
    marginBottom: -42,
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
    fontSize: 18,
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
    flexDirection: "row",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 120,
    textAlign: 'right',
  },
  infoText: {
    flex: 1,
    fontSize: 18,
    flexWrap: 'wrap',
  },
});
