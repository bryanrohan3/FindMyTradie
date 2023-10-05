import { Dimensions, StyleSheet } from "react-native";

const activeTabButton = {
  backgroundColor: "#fff",
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 20,
};

const inactiveTabButton = {
  backgroundColor: "lightgrey",
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 20,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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

  button: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  buttonWrapper: {
    backgroundColor: "#4B7BEC",
    borderRadius: 25,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
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

  // Sent Requests
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
  status: {
    color: "gray",
    paddingLeft: 5,
    fontFamily: "Avenir",
    // fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: Dimensions.get("window").height * 0.015,
  },

  // code for modal
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  titleModal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    // padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // updated modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay background
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    right: Dimensions.get("window").width * 0.03,
    top: Dimensions.get("window").height * 0.013,
    padding: Dimensions.get("window").width * 0.005,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: Dimensions.get("window").height * 0.02,
    // add a space between the buttons
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.5,
  },
  buttonText: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "black",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  acceptOrDecline: {
    fontSize: Dimensions.get("window").height * 0.019,
    marginTop: Dimensions.get("window").height * 0.03,
    marginLeft: Dimensions.get("window").width * 0.05,
    marginRight: Dimensions.get("window").width * 0.05,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  acceptButton: {
    backgroundColor: "#000",
    borderRadius: Dimensions.get("window").height * 0.005,
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
  },
  declineButton: {
    backgroundColor: "#fff",
    borderRadius: Dimensions.get("window").height * 0.005,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
  },
  acceptButtonText: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  declineButtonText: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Avenir",
  },

  // Current Requests
  mainTitle: {
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
    marginBottom: Dimensions.get("window").height * 0.01,
    fontFamily: "Avenir",
    marginTop: Dimensions.get("window").height * 0.035,
    // fontWeight: "bold",
  },
  actionButton: {
    marginTop: Dimensions.get("window").height * 0.035,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#2B2B2B",
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  actionButton2: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#fff",
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  actionButtonText: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "white",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  actionButtonText2: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "black",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  or: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Avenir",
  },
});
