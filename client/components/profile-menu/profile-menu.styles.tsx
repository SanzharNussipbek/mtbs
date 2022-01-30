import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 128,
  },
  menuItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fbcfe8",
    marginBottom: 16,
  },
  menuItemLast: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  icon: {},
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemBody: {},
  menuItemText: {
    textTransform: "uppercase",
  },
});