import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { firebase } from "../src/firebase/config";
import styles from "./styles";
import * as Icons from "react-native-heroicons/solid";

export default function CustomDrawer(props) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [verified, setVerified] = useState(false);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setName(doc.data().fullName);
        setVerified(doc.data().verified === "True");
        // set the verified state based on the value of the 'verified' property
      });
  }, []);

  // get the tradesperson name from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setName(doc.data().fullName);
      });
  }, []);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setImageUrl(doc.data().profilePicture);
      });
  }, []);

  const onLogoutPress = () => {
    props.navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerHeader}>
        <Image
          source={
            imageUrl ? { uri: imageUrl } : require("../assets/null2.jpeg")
          }
          style={styles.drawerAvatar}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.drawerName}>{name}</Text>
          {verified && (
            <Icons.CheckBadgeIcon
              style={{
                marginTop: Dimensions.get("window").height * 0.025,
                marginLeft: Dimensions.get("window").width * 0.01,
              }}
            />
          )}
        </View>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity onPress={onLogoutPress}>
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: Dimensions.get("window").width * 0.09,
            marginTop: Dimensions.get("window").height * 0.02,
            fontSize: Dimensions.get("window").width * 0.04,
            fontFamily: "Avenir",
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
