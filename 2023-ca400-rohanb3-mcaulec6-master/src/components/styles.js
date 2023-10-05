import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  drawerContent: {
    width: 150, // Change this to whatever width you want
    marginTop: 20,
    flex: 1,
  },
  drawerHeader: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  drawerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: "gray",
    marginLeft: Dimensions.get("window").width * 0.05,
  },
  drawerName: {
    fontSize: Dimensions.get("window").width * 0.05,
    marginTop: Dimensions.get("window").width * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  logout: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
    marginLeft: Dimensions.get("window").width * 0.05,
    color: "black",
    fontFamily: "Avenir",
  },
  otherBox: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
  },
});
