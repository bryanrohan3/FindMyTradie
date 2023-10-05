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
    marginRight: 10,
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
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: "Avenir",
  },
  occupation: {
    color: "gray",
    marginTop: 5,
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
  },
});
