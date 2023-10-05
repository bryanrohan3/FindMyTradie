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
  totalEarnings: {
    marginTop: Dimensions.get("window").height * 0.03,
    marginBottom: Dimensions.get("window").height * 0.02,
    marginLeft: Dimensions.get("window").width * 0.07,
    alignContent: "center",
    alignItems: "center",
  },
  Count: {
    marginTop: Dimensions.get("window").height * 0.02,
    marginBottom: Dimensions.get("window").height * 0.01,
    marginLeft: Dimensions.get("window").width * 0.07,
  },
  totalEarningsText: {
    fontSize: Dimensions.get("window").width * 0.045,
    color: "gray",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  // job Count
  jobCount: {
    marginTop: Dimensions.get("window").height * 0.01,
    marginBottom: Dimensions.get("window").height * 0.01,
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  jobCountHeading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: Dimensions.get("window").width * 0.1,
    marginTop: 20,
    fontFamily: "Avenir",
  },
  statusContainer: {
    marginTop: Dimensions.get("window").height * 0.01,
    padding: 10,
    paddingTop: Dimensions.get("window").height * 0.02,
    paddingBottom: Dimensions.get("window").height * 0.03,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
  },
  status: {
    fontSize: Dimensions.get("window").width * 0.04,
    color: "gray",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  countContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  jobCount: {
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
    fontFamily: "Avenir",
    marginLeft: Dimensions.get("window").width * 0.07,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height * 0.01,
    width: "100%",
  },
  statusColumn: {
    alignItems: "center",
  },
  statusTitle: {
    fontSize: Dimensions.get("window").width * 0.035,
    fontWeight: "bold",
    color: "gray",
    marginBottom: Dimensions.get("window").height * 0.01,
  },
  statusValue: {
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
  },
  clientValue: {
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "bold",
    marginLeft: Dimensions.get("window").width * 0.15,
    marginTop: Dimensions.get("window").height * 0.005,
    color: "gray",
    fontFamily: "Avenir",
  },
});
