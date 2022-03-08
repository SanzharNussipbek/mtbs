import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 24,
    width: "100%",
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  ticket: {
    height: "100%",
    width: 80,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  img: {
    width: "100%",
    height: 105,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    backgroundColor: "transparent",
  },
  text: {
    width: "100%",
    maxWidth: "100%",
    flex: 1,
    backgroundColor: "transparent",
  },
  body: {
    flex: 1,
    fontSize: 14,
    backgroundColor: "transparent",
  },
  skeletonContainer: {
    position: "relative",
  },
  skeleton: {
    width: "100%",
    height: 105,
    borderRadius: 4,
    position: "absolute",
    left: 0,
    top: 0,
  },
  circle: {
    position: "absolute",
    height: 80,
    width: 30,
    top: 23,
    left: -18,
    borderRadius: 100,
    backgroundColor: "black",
  },
  endCircle: {
    position: "absolute",
    height: 80,
    width: 30,
    top: 23,
    right: -18,
    borderRadius: 100,
    backgroundColor: "black",
  },
});
