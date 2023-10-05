import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Linking,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import Reviews from "../../../components/Reviews";

export default function TradePageScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [headline, setHeadline] = useState("");
  const [isImageBig, setIsImageBig] = useState(false);
  const [verified, setVerified] = useState(false);
  const { id } = route.params;
  const [phone, setPhone] = React.useState("");
  const [town_city, setTown_city] = useState("");
  const [rating, setRating] = useState(0);
  const [currentJobStatus, setCurrentJobStatus] = useState("");
  const [isRequestDisabled, setIsRequestDisabled] = useState(false);
  const [skills, setSkills] = useState([]);
  const [userFullName, setUserFullName] = useState("");

  // get {skills} from database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setSkills(doc.data().skills);
      });
  }, []);

  const onPaymentPress = () => {
    navigation.navigate("ConfirmPayment");
  };

  const onRequestPress = () => {
    navigation.navigate("RequestJob");
  };

  // get {verified} from database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setVerified(doc.data().verified);
      });
  }, []);

  // get the {profilePicture} from the database
  const [profilePicture, setProfilePicture] = useState(null);
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setProfilePicture(doc.data().profilePicture);
      });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  //check if user is verified
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setVerified(doc.data().verified);
      });
  }, []);

  // get the tradesperson name from the database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setName(doc.data().fullName);
        console.log("name fetched", doc.data().fullName);
      });
  }, []);

  // get {userFullName} from database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setUserFullName(doc.data().fullName);
      });
  }, []);

  // get the {phone} from the database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setPhone(doc.data().phone);
        console.log("phone fetched", doc.data().phone);
      });
  }, []);

  // get the {trade} from the database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTrade(doc.data().trade);
      });
  }, []);

  // get the {town_city} from the database
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTown_city(doc.data().town_city);
      });
  }, []);

  // get the {Headline} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setHeadline(doc.data().Headline);
      });
  }, []);

  // toggle the image size when image is clicked
  const onImagePress = () => {
    setIsImageBig(!isImageBig);
  };

  // when the customer clicks on the arrow, it will navigate back to CustomerHomeScreen
  const onArrowPress = () => {
    navigation.goBack();
  };

  const handleJobRequest = async () => {
    setIsRequestDisabled(true);
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userName = userDoc.data().fullName;
    const jobData = {
      customerId: userId,
      customerName: userName,
      tradesmanId: id,
      tradesmanName: name,
      tradesmanTrade: trade,
      tradesmanProfilePicture: profilePicture,
      status: "Requested",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const jobRef = await firebase.firestore().collection("jobs").add(jobData);
    console.log("Job request sent!");

    setCurrentJobStatus("Requested");

    jobRef.onSnapshot((doc) => {
      const data = doc.data();
      setCurrentJobStatus(data.status);
      if (data.status === "Completed") {
        setIsRequestDisabled(false);
      }
    });
  };

  // when page is opend display the tradespersons rating from the users collection
  React.useEffect(() => {
    const userId = id;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setRating(doc.data().rating);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      {/* // Profile Picture directs user to ProfileScreen */}

      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.2,
          borderBottomColor: "#C0C0C0",
          paddingBottom: "4%",
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity onPress={onArrowPress}>
          <Icons.ArrowLeftIcon
            size={25}
            style={{
              marginLeft: 30,
              marginTop: 20,
              color: "black",
              marginBottom: 8,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.titleCenter2}>Profile</Text>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.box}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            {/* Profile Picture */}
            <View style={{ position: "relative" }}>
              <Image
                source={
                  profilePicture
                    ? { uri: profilePicture }
                    : require("../../../assets/null2.jpeg")
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  marginTop: "5%",
                  marginLeft: "5%",
                }}
              />
              {verified === "True" && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 100,
                    backgroundColor: "white",
                  }}
                >
                  <Icons.CheckBadgeIcon
                    size={35}
                    style={{ width: 30, height: 30, color: "#1982FC" }}
                  />
                </View>
              )}
            </View>

            {/* Profile Details */}
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text style={styles.name}>
                {name}
              </Text>
              <Text style={styles.occupation}>{trade}</Text>
              <Text style={styles.location}>{town_city}</Text>
            </View>
          </View>

          {/* Contact Us */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rating}>Rating</Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: Dimensions.get("window").width * 0.03,
                  borderRadius: 20,
                  backgroundColor: "#F1F1F1",
                  width: Dimensions.get("window").width * 0.25,
                  padding: Dimensions.get("window").width * 0.01,
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Icons.StarIcon
                  size={25}
                  style={{
                    marginRight: "3%",
                    marginBottom: Dimensions.get("window").width * 0.01,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                  color="black"
                />
                <Text
                  style={{
                    fontSize: Dimensions.get("window").width * 0.05,
                    fontFamily: "Avenir",
                    paddingLeft: 10,
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                >
                  {rating ? rating : "N/R"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contact}>Contact Me</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.phoneButton}
                  onPress={() => Linking.openURL(`tel:${phone}`)}
                >
                  <Icons.PhoneIcon size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.messageButton}
                  onPress={async () => {
                    const message = `Hi ${name},\n\nI found you on FindMyTradie and would like to get a quote for a job if you are available.\n\nThanks,\n${userFullName}`;

                    // Encode the message to be URL safe
                    const encodedMessage = encodeURIComponent(message);

                    try {
                      await Linking.openURL(
                        `sms:${phone}&body=${encodedMessage}`
                      );
                    } catch (error) {
                      console.error("Error opening messaging app:", error);
                    }
                  }}
                >
                  <Icons.ChatBubbleBottomCenterIcon size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.requestContainer}>
            <TouchableOpacity
              style={[
                styles.requestButtton,
                (currentJobStatus === "Requested" ||
                  currentJobStatus === "Accepted") && {
                  backgroundColor: "#C0C0C0",
                },
              ]}
              onPress={handleJobRequest}
              disabled={
                currentJobStatus !== "Completed" && currentJobStatus !== ""
              }
            >
              <Text
                style={[
                  styles.requestButttonText,
                  (currentJobStatus === "Requested" ||
                    currentJobStatus === "Accepted") && {
                    color: "white",
                  },
                ]}
              >
                {currentJobStatus === "Requested" ||
                  currentJobStatus === "Accepted"
                  ? "Job Requested"
                  : "Request a Job"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.skillsHeader}>
          <Icons.WrenchScrewdriverIcon
            size={Dimensions.get("window").width * 0.05}
            color="#000"
            style={{
              marginBottom: Dimensions.get("window").height * 0.003,
            }}
          />
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.04,
              fontWeight: "bold",
              fontFamily: "Avenir",
              marginLeft: Dimensions.get("window").width * 0.03,
            }}
          >
            Skills
          </Text>
        </View>

        {/* skills in the database is an Array, if the field is in the database display them, if not don't displa anyhting */}
        {!skills || skills.length === 0 ? (
          <Text style={styles.errorText}>
            This Tradie Has Not Added Any Skills
          </Text>
        ) : (
          skills.map((skill, index) => (
            <View key={index} style={styles.skillWrapper}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))
        )}

        {/* 1 px border */}
        <View
          style={{
            height: 1,
            backgroundColor: "#D3D3D3",
            marginTop: Dimensions.get("window").height * 0.03,
            marginBottom: 5,
          }}
        />

        <View style={styles.skillsHeaderReviews}>
          <Icons.StarIcon
            size={Dimensions.get("window").width * 0.05}
            color="#000"
            style={{
              marginBottom: Dimensions.get("window").height * 0.003,
            }}
          />
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.04,
              fontWeight: "bold",
              fontFamily: "Avenir",
              marginLeft: Dimensions.get("window").width * 0.03,
            }}
          >
            Reviews & Ratings
          </Text>
        </View>

        <Reviews id={id} />
      </KeyboardAwareScrollView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton}>
          <Icons.MagnifyingGlassIcon
            style={styles.tabButtonIcon}
            color="black"
          />
          <Text style={styles.tabButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onRequestPress}>
          <IconsOutline.BriefcaseIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <IconsOutline.CreditCardIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
