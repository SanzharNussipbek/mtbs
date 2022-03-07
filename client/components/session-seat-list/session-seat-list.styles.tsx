import { transform } from "@babel/core";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  row: {
    marginBottom: 12,
  },
  rowNum: {
    width: 20,
    marginRight: 16,
    textAlign: "right",
    transform: [{translateX: -8}]
  },
});
