import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sessionTimeItem: {
    minWidth: 80,
    paddingVertical: 4,
    marginBottom: 8,
    marginRight: 10,
    position: 'relative',
  },
  future: {
    backgroundColor: "#b91c1c",
    borderWidth: 1,
    borderColor: '#b91c1c',
    borderRadius: 4,
  },
  past: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: '#fefefe',
  },
  text: {
    color: "white",
    textAlign: 'center',
  },
  circle: {
    position: "absolute",
    height: 20,
    width: 20,
    top: 5,
    left: -11,
    borderRadius: 50,
    backgroundColor: 'black',
  },
});
