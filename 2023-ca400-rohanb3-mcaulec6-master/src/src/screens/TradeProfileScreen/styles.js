import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  otherBox: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#2B2B2B",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  messageButton: {
    backgroundColor: "#1982FC",
    marginLeft: 20,
    marginRight: 10,
    height: 48,
    borderRadius: 50,
    padding: 14,
    marginBottom: "5%",
  },
  phoneButton: {
    backgroundColor: "#43CC47",
    marginLeft: 40,
    height: 48,
    padding: 14,
    borderRadius: 50,
    marginBottom: "5%",
  },
  name: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width * 0.065,
    marginTop: "8%",
    paddingBottom: 3,
    fontFamily: "Avenir",
  },
  occupation: {
    color: "gray",
    fontSize: Dimensions.get("window").width * 0.045,
    paddingBottom: 7,
    fontFamily: "Avenir",
  },
  location: {
    fontSize: Dimensions.get("window").width * 0.04,
    color: "gray",
    fontFamily: "Avenir",
  },

  contact: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 18,
    marginTop: "10%",
    marginLeft: 50,
    marginLeft: Dimensions.get("window").width * 0.12,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "7%",
    fontFamily: "Avenir",
  },
  rating: {
    color: "gray",
    fontSize: Dimensions.get("window").width * 0.045,
    marginBottom: Dimensions.get("window").height * 0.01,
    alignItems: "center",
    fontFamily: "Avenir",
    // marginLeft: Dimensions.get("window").width * 0.06,
  },
  infoContainer2: {
    maeginLeft: 20,
    maxWidth: Dimensions.get("window").width * 0.7,
  },
  // Profile Header
  titleCenter2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    marginRight: 60,
    fontWeight: "bold",
    marginTop: "5%",
    fontFamily: "Avenir",
  },
  // NavBar styling
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
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  tabButtonDisabledText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Avenir",
  },
  // NavBar styling end

  // Reviews styling
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
  status: {
    color: "gray",
    paddingLeft: 5,
    fontFamily: "Avenir",
    // fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 14,
  },
  skillText: {
    marginTop: Dimensions.get("window").height * 0.005,
    color: "gray",
    marginLeft: Dimensions.get("window").width * 0.07,
    fontFamily: "Avenir",
    // fontStyle: "italic",
    fontSize: Dimensions.get("window").width * 0.037,
    backgroundColor: "#f4f4f4",
    padding: 10,
    marginRight: Dimensions.get("window").width * 0.07,
    marginBottom: Dimensions.get("window").height * 0.005,
    borderRadius: 10, // or any other value you prefer
  },
  skillWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: Dimensions.get("window").width * 0.07,
    marginVertical: Dimensions.get("window").height * 0.005,
  },
  skillText: {
    color: "black",
    fontFamily: "Avenir",
    fontSize: Dimensions.get("window").width * 0.037,
    paddingLeft: Dimensions.get("window").width * 0.02,
  },
  skillsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Dimensions.get("window").width * 0.07,
    marginTop: Dimensions.get("window").height * 0.025,
    marginBottom: Dimensions.get("window").height * 0.01,
  },
  skillsHeaderReviews: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Dimensions.get("window").width * 0.07,
    marginTop: Dimensions.get("window").height * 0.025,
    // marginBottom: Dimensions.get("window").height * 0.01,
  },
  errorText: {
    color: "gray",
    fontSize: Dimensions.get("window").width * 0.035,
    textAlign: "center",
    fontFamily: "Avenir",
  },
});
