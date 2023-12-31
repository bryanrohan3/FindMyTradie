import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // Trade Registration Screen
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "semi-bold",
    color: "black",
    fontFamily: "Avenir",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: Dimensions.get("window").width / 9,
    marginRight: Dimensions.get("window").width / 9,
    paddingLeft: 16,
    borderColor: "#232B2B",
    borderBottomWidth: 0.5,
    fontFamily: "Avenir",
  },
  button: {
    backgroundColor: "#232B2B",
    marginLeft: Dimensions.get("window").width / 9,
    marginRight: Dimensions.get("window").width / 9,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Avenir",
  },
  footerLink: {
    color: "#232B2B",
    fontWeight: "bold",
    fontSize: 16,
  },
  // end of Trade Registration Screen

  showbutton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  titleSetUp: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    fontSize: Dimensions.get("window").width * 0.045,
    fontWeight: "bold",
    color: "#3b444c",
    marginTop: 20,
    fontFamily: "Avenir",
  },

  // About You Screen
  textSetUp2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 30,
    fontSize: Dimensions.get("window").width * 0.035,
    color: "gray",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: "Avenir",
  },

  titleAboutYou: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimensions.get("window").width * 0.075,
    fontWeight: "bold",
    color: "#3b444c",
    marginTop: Dimensions.get("window").height * 0.1,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: "Avenir",
  },
  prefix: {
    height: 48,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  phoneNumber: {
    height: 48,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    paddingRight: 170,
  },
  squareContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    position: "relative",
    fontFamily: "Avenir",
  },
  square: {
    width: "90%",
    marginLeft: 20,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectTradeButton: {
    width: "90%",
    marginLeft: 20,
    backgroundColor: "#f9f9f9",
    // borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
  },
  squareText: {
    fontSize: 16,
    marginLeft: 100,
    marginTop: 20,
    marginBottom: 20,
    marginVertical: 10,
    color: "#3b444c",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },

  // TradeAboutYouScreen
  borderStyle: {
    borderBottomWidth: 0.5,
    borderRadius: 10,
    borderColor: "black",
    height: 48,
    marginTop: 10,
    marginLeft: Dimensions.get("window").width * 0.02,
    marginBottom: Dimensions.get("window").width * 0.04,
  },
  textContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  textInput: {
    fontFamily: "Avenir",
  },

  // CorrectPinScreen
  map: {
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  // TradeWorkingRadiusScreen
  picker: {
    height: 50,
    borderColor: "#04A78F",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginLeft: 30,
  },
  pickerContainer: {
    padding: 10,
    margin: 10,
    marginLeft: 30,
  },
  pickerText: {
    marginLeft: 30,
    height: 45,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontFamily: "Avenir",
  },
  dropdown: {
    height: 48,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginLeft: 30,
    marginBottom: 30,
  },
  textSetUp3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimensions.get("window").width * 0.035,
    color: "gray",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  textSetUp4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "gray",
    marginTop: Dimensions.get("window").height * 0.03,
    marginBottom: Dimensions.get("window").height * 0.025,
    marginLeft: 30,
    marginRight: 30,
  },

  // SkillsScreen
  mainWrapper: {
    paddingHorizontal: Dimensions.get("window").width * 0.07,
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "#fff",
  },
  listContainer: {
    marginHorizontal: Dimensions.get("window").width * 0.06,
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "#fff",
  },
  rowList: {
    backgroundColor: "#F5F5F5",
    marginBottom: Dimensions.get("window").height * 0.015,
    backgroundColor: "#fff",
    paddingBottom: Dimensions.get("window").height * 0.01,
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
  },
  buttonConfirm: {
    backgroundColor: "#2B2B2B",
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Avenir",
  },
  containerConfirmation: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleConfirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    fontSize: Dimensions.get("window").width * 0.06,
    fontWeight: "bold",
    marginBottom: Dimensions.get("window").height * 0.02,
    // color: "white",
    // marginTop: 8,
    fontFamily: "Avenir",
  },
  titleCongrats: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    fontSize: Dimensions.get("window").width * 0.055,
    fontWeight: "bold",
    marginBottom: Dimensions.get("window").height * 0.02,
    // color: "white",
    // marginTop: 8,
    fontFamily: "Avenir",
  },
  subtitleConfirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: Dimensions.get("window").width * 0.035,
    marginBottom: Dimensions.get("window").height * 0.02,
    color: "gray",
    fontFamily: "Avenir",
  },
});
