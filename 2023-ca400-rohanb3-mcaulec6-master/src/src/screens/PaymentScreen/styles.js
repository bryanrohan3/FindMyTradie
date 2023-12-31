import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerConfirmation: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Dimensions.get("window").width * 0.03,
    fontSize: Dimensions.get("window").width * 0.06,
    fontWeight: "bold",
    marginBottom: Dimensions.get("window").width * 0.04,
    color: "#3b444c",
    marginTop: Dimensions.get("window").height * 0.04,
    fontFamily: "Avenir",
  },
  titleConfirm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    fontSize: Dimensions.get("window").width * 0.06,
    fontWeight: "bold",
    marginBottom: 20,
    // color: "white",
    // marginTop: 8,
    fontFamily: "Avenir",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 120,
    marginLeft: 30,
    margin: 30,
    borderRadius: 100,
  },
  button: {
    backgroundColor: "#2B2B2B",
    // width: Dimensions.get("window").width > 400 ? 300 : 200,
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
    marginTop: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    height: 60,
    borderRadius: 10,
    fontSize: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  input2: {
    height: 60,
    borderRadius: 10,
    fontSize: 40,
    borderColor: "lightgray",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  focused2: {
    borderColor: "black",
  },
  focused: {
    borderColor: "black",
  },
  EUR: {
    fontSize: 20,
    color: "black",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "#E5E7E9",
    padding: 5,
    borderColor: "#E5E7E9",
    marginBottom: 5,
    borderRadius: 18,
    textAlign: "center",
    alignSelf: "center", // Center the element horizontally
    fontFamily: "Avenir",
  },

  savebutton: {
    backgroundColor: "#788eec",
    marginLeft: 150,
    marginRight: 150,
    marginTop: 20,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Avenir",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  textLabel: {
    fontSize: 15,
    color: "gray",
    marginBottom: 5,
    marginLeft: 30,
    marginTop: 10,
  },
  headline: {
    fontSize: 17,
    marginBottom: 10,
    color: "#3b444c",
    marginLeft: 30,
  },
  location: {
    fontSize: 17,
    color: "gray",
    marginBottom: 5,
    marginLeft: 30,
  },
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
  },
  pencilbutton: {
    marginLeft: 150,
    marginRight: 150,
    marginTop: 20,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  headline: {
    fontSize: 17,
    marginBottom: 10,
    color: "#3b444c",
    marginLeft: 30,
  },
  location: {
    fontSize: 17,
    color: "gray",
    marginBottom: 5,
    marginLeft: 30,
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  occupation: {
    color: "gray",
  },
  headingTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b444c",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
  },
  // NavBar styling
  // containerNav: {
  //   height: 60,
  //   flexDirection: "row",
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   borderRadius: 10,
  //   marginTop: 10,
  //   paddingTop: 10,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: -10 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10,
  //   elevation: 10,
  //   position: "relative",

  //   // Add a border to create a separate shadow effect from the content
  //   borderTopWidth: 1,
  //   borderTopColor: "#ddd",
  // },
  // tabButton: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  // },
  // tabButtonIcon: {
  //   width: 30,
  //   height: 30,
  // },
  // tabButtonText: {
  //   fontSize: 12,
  //   color: "black",
  //   fontFamily: "Avenir",
  //   fontWeight: "bold",
  // },
  // tabButtonDisabledText: {
  //   fontSize: 12,
  //   color: "gray",
  // },
  squareContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: "10%",
    marginTop: 20,
  },
  square: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#f9f9f9",
    // borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
    padding: "5%",
  },
  squareTextBox: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: "20%",
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  // PaymentScreen.js
  selectClient: {
    // marginLeft: 30,
    // marginRight: 30,
    width: Dimensions.get("window").width - 60,
    alignSelf: "center",
    marginTop: 20,
    height: 65,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#E5E7E9",
    padding: 5,
    flexDirection: "row",
    outline: "none", // remove the outline
    fontFamily: "Avenir",
  },
  selectClientIcon: {
    marginRight: 15,
    width: 24,
    height: 24,
    color: "gray",
    fontFamily: "Avenir",
  },
  selectClientTitle: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Avenir",
  },
  payPal: {
    width: Dimensions.get("window").width * 0.25,
    height: Dimensions.get("window").height * 0.03,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  revolut: {
    width: Dimensions.get("window").width * 0.075,
    height: Dimensions.get("window").height * 0.04,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    marginTop: Dimensions.get("window").height * 0.01,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "black",
  },
  tabText: {
    color: "#555",
    fontSize: 16,
    fontFamily: "Avenir",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },

  // Navigation Bar at bottom of Screen
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 90, // You can adjust the height as needed
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabButtonIcon: {
    width: 30,
    height: 30,
  },
  tabButtonText: {
    fontSize: 12,
    color: "black",
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  tabButtonDisabledText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Avenir",
  },
  // end of Navigation Bar

  // Payment History
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Dimensions.get("window").height * 0.01,
    marginLeft: Dimensions.get("window").height * 0.01,
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.019,
    paddingLeft: 10,
    marginTop: Dimensions.get("window").height * 0.01,
    fontFamily: "Avenir",
  },
  occupation: {
    color: "gray",
    marginTop: Dimensions.get("window").height * 0.001,
    paddingLeft: 10,
    fontFamily: "Avenir",
  },
  money: {
    paddingLeft: 5,
    fontFamily: "Avenir",
    // fontStyle: "italic",
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.017,
    marginTop: Dimensions.get("window").height * 0.015,
  },
});
