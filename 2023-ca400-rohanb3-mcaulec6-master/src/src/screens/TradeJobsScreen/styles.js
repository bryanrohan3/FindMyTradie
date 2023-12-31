import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "#3b444c",
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
    backgroundColor: "#04A78F",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
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
  savebutton: {
    backgroundColor: "#788eec",
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
  },
  headline: {
    fontSize: 17,
    marginBottom: 10,
    color: "#3b444c",
    marginLeft: 30,
  },
  trade: {
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
});
