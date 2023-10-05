import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageButton: {
    backgroundColor: "#f9f9f9",
    // borderWidth: 0.5,
    marginTop: 20,
    height: 170,
    width: 170,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    height: 70,
    width: 70,
    marginBottom: 10,
  },
  buttonTitle: {
    color: "black",
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
    fontFamily: "Avenir",
  },
  footerLink: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Avenir",
  },
});
