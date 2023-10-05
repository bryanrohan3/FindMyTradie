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
    // alignItems: "center",
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
    marginRight: 10,
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.02,
    paddingLeft: 10,
    fontFamily: "Avenir",
  },
  occupation: {
    color: "gray",
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "Avenir",
    fontSize: Dimensions.get("window").height * 0.015,
  },
  status: {
    color: "gray",
    paddingLeft: 5,
    fontFamily: "Avenir",
    // fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
  },
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "20%",
  },

  // Modal Styling
  buttonsContainer: {
    flexDirection: "row",
    marginTop: Dimensions.get("window").height * 0.02,
    // add a space between the buttons
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.5,
  },
  declineButtonText: {
    fontSize: Dimensions.get("window").height * 0.017,
    color: "black",
    fontWeight: "bold",
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
  acceptOrDecline: {
    fontSize: Dimensions.get("window").height * 0.019,
    // marginTop: Dimensions.get("window").height * 0.03,
    marginLeft: Dimensions.get("window").width * 0.05,
    marginRight: Dimensions.get("window").width * 0.05,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay background
  },

  // Modal Review
  openModalButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  openModalButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay background
  },
  modalContent2: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  modalTitle2: {
    fontSize: Dimensions.get("window").height * 0.02,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Avenir",
    marginTop: Dimensions.get("window").height * 0.01,
    marginBottom: Dimensions.get("window").height * 0.015,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  reviewInput2: {
    // borderColor: "gray",
    // borderWidth: 1,
    borderBottomWidth: 1,
    height: Dimensions.get("window").height * 0.04,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    fontFamily: "Avenir",
    marginLeft: Dimensions.get("window").width * 0.03,
    marginRight: Dimensions.get("window").width * 0.03,
  },
  submitButton2: {
    marginTop: Dimensions.get("window").height * 0.02,
    backgroundColor: "#2B2B2B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    // width: Dimensions.get("window").width * 0.5,
    alignSelf: "center",
    borderWidth: 1,
    marginLeft: Dimensions.get("window").width * 0.07,
  },
  submitButtonText2: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.017,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  closeButton2: {
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: Dimensions.get("window").height * 0.01,
    // width: Dimensions.get("window").width * 0.5,
    alignSelf: "center",
  },
  closeButtonText2: {
    color: "black",
    fontSize: Dimensions.get("window").height * 0.017,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  starRatingContainer2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Dimensions.get("window").height * 0.015,
  },
});
