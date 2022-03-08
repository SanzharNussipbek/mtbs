import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderBottomColor: "#db2777",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  parentHr: {
    height: 1,
    width: "100%",
  },
  child: {
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
});
