import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase, storage } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import * as Progress from "react-native-progress";


export default function VerificationScreen({ navigation }) {
  const [trade, setTrade] = useState("");
  const [name, setName] = useState("");

  async function pickDocument() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedDocument = result.assets[0];
      uploadDocument(selectedDocument.uri);
    }
  }

  async function uploadDocument(uri) {
    const userId = firebase.auth().currentUser.uid;
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storageRef(storage, `documents/${userId}`);
    const uploadTask = uploadBytesResumable(ref, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Show progress (optional)
      },
      (error) => {
        // Handle errors
        console.log(error);
        alert("Upload failed");
      },
      () => {
        // On successful upload
        getDownloadURL(ref).then((downloadURL) => {
          saveDocumentUrlToFirestore(downloadURL);
        });
      }
    );
  }

  async function saveDocumentUrlToFirestore(documentUrl) {
    const userId = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(userId).update({
      document: documentUrl,
      verified: "Pending",
    });

    alert("Document uploaded successfully");
    navigation.navigate("FinishedSetUp");
  }

  const [documentUrl, setDocumentUrl] = useState(null);

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // get the {trade} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTrade(doc.data().trade);
      });
  }, []);

  // get {fullName} from the database
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("FinishedSetUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="always"
      >
        {/* top of screeb */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            borderBottomWidth: 0.2,
            borderBottomColor: "#C0C0C0",
            paddingBottom: "4%",
          }}
        >
          <TouchableOpacity onPress={onBackArrowPress}>
            <Icons.ArrowLeftIcon
              style={{
                marginLeft: Dimensions.get("window").width * 0.06,
                color: "black",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginRight: Dimensions.get("window").width * 0.07,
            }}
          >
            <Progress.Bar
              progress={0.9}
              width={200}
              style={{
                alignSelf: "center",
                alignContent: "center",
              }}
              color="#232B2B"
            />
          </View>
        </View>

        {/* upload documents to database using the selectDocument function */}
        <View>
          <View>
            <Text style={styles.titleAboutYou}>Upload Documents</Text>
          </View>
          <Text style={styles.textSetUp3}>
            {" "}
            Upload your documents to verify your status as a {trade}{" "}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: Dimensions.get("window").height * 0.05,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontSize: Dimensions.get("window").width * 0.05,
                color: "#232B2B",
                alignSelf: "center",
              }}
            >
              {name}
            </Text>
            <Icons.CheckBadgeIcon
              style={{
                color: "#1DA1F2",
                alignSelf: "center",
                marginLeft: Dimensions.get("window").width * 0.015,
              }}
              size={Dimensions.get("window").width * 0.07}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#F1F1F1",
              padding: Dimensions.get("window").width * 0.04,
              borderRadius: 25,
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.8,
              alignSelf: "center",
              marginTop: Dimensions.get("window").height * 0.05,
            }}
            onPress={pickDocument}
          >
            <Icons.CloudArrowUpIcon
              style={{
                //put the icon in the middle of the button
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                width: Dimensions.get("window").width * 0.1,
                height: Dimensions.get("window").width * 0.1,
              }}
              size={30}
            />
            {documentUrl ? (
              <Text
                style={{
                  color: "black",
                  fontFamily: "Avenir",
                  fontSize: Dimensions.get("window").width * 0.04,
                }}
              >
                Document Uploaded
              </Text>
            ) : (
              <Text
                style={{
                  color: "black",
                  fontFamily: "Avenir",
                  fontSize: Dimensions.get("window").width * 0.04,
                }}
              >
                Upload Document
              </Text>
            )}
          </TouchableOpacity>
          <Text style={styles.textSetUp4}> or </Text>
          {/*Skip Verifcation for now  */}
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              justifyContent: "space-between",
              alignItems: "center",
              width: Dimensions.get("window").width * 0.8,
              alignSelf: "center",
            }}
            onPress={onContinuePress}
          >
            <Text
              style={{
                color: "gray",
                fontFamily: "Avenir",
                fontSize: Dimensions.get("window").width * 0.037,
                textDecorationLine: "underline",
              }}
            >
              Skip Verification for now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
