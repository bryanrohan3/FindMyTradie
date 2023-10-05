import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";

export default function TradeProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [isImageBig, setIsImageBig] = useState(false);
  const [verified, setVerified] = useState(false);
  const [trade, setTrade] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [town_city, setTown_city] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // Add this function outside the useEffect
  const fetchData = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setName(doc.data().fullName);
        setTrade(doc.data().trade);
        setSkills(doc.data().skills);
        setVerified(doc.data().verified);
        setRating(doc.data().rating);
      });
  };

  const onAnalyticsPress = () => {
    navigation.navigate("AnalyticsTrade");
  };

  // Update the useEffect for the initial fetch
  React.useEffect(() => {
    fetchData();
  }, []);

  // Add the useEffect for the focus event listener
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  // get {verified} from the database
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

  // get the {profilePicture} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
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

  // when the user clicks on the Pen icon, it will navigate to the ProfileScreen
  const onEditProfilePress = () => {
    navigation.navigate("EditProfile");
  };

  const onHomePress = () => {
    navigation.navigate("HomeScreen");
  };

  // get the {fullName} from the database
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

  // get {trade} from the database
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

  // get the {town_city} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setSearchLocation(doc.data().town_city);
      });
  }, []);

  // get the {phone} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setPhone(doc.data().phone);
      });
  }, []);

  // log the user out
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // when the user clicks on the image icon, it will navigate to the ProfileScreen
  const onProfileImagePress = () => {
    //go back
    navigation.goBack();
  };

  const onPaymentPress = () => {
    navigation.navigate("Payment");
  };

  // get {town_city} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTown_city(doc.data().town_city);
      });
  }, []);

  // Reviews and Ratings

  // get users {rating} from the database
  const [rating, setRating] = useState(0);
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setRating(doc.data().rating);
      });
  }, []);

  // get users {ratingCount} from the database
  const [ratingCount, setRatingCount] = useState(0);
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setRatingCount(doc.data().ratingCount);
      });
  }, []);

  // get {skills} from the database
  const [skills, setSkills] = useState([]);
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setSkills(doc.data().skills);
      });
  }, []);

  // get {customerName, customerProfilePicture, review, rating, customerId, tradesmanId, jobId, tradesmanName} from the database collection "reviews"
  const [reviews, setReviews] = useState([]);
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("reviews")
      .where("tradesmanId", "==", userId)
      .onSnapshot((querySnapshot) => {
        const reviews = [];
        querySnapshot.forEach((documentSnapshot) => {
          reviews.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setReviews(reviews);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.otherBox}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={
              item.customerProfilePicture
                ? { uri: item.customerProfilePicture }
                : require("../../../assets/null2.jpeg")
            }
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginTop: "5%",
              marginLeft: Dimensions.get("window").width * 0.07,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: 30,
              marginTop: 20,
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: Dimensions.get("window").width * 0.035,
                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              {item.customerName}
            </Text>
            <Text
              style={{
                fontSize: Dimensions.get("window").width * 0.03,
                fontFamily: "Avenir",
                marginTop: 2,
                color: "gray",
              }}
            >
              {item.review}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: "10%",
            padding: 5,
            paddingLeft: 10,
            borderRadius: 20,
            marginRight: Dimensions.get("window").width * 0.01,
            backgroundColor: "#F1F1F1",
          }}
        >
          <Icons.StarIcon size={20} color="#2B2B2B" />
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.035,
              fontFamily: "Avenir",
              marginLeft: Dimensions.get("window").width * 0.01,
              paddingRight: 10,
            }}
          >
            {item.rating ? item.rating : "N/R"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

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
        <TouchableOpacity onPress={onProfileImagePress} testID={"backButton"}>
          <Icons.ArrowLeftIcon
            size={30}
            color="#000"
            style={{ marginLeft: 25 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.055,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            My Profile
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 25,
          }}
        >
          <TouchableOpacity onPress={onEditProfilePress}>
            <Icons.PencilIcon size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAwareFlatList
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
        renderItem={null}
        data={[]}
        ListHeaderComponent={
          <>
            <View style={styles.box}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
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
                <View style={styles.infoContainer2}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.occupation}>{trade}</Text>
                  <Text style={styles.location}>{town_city}</Text>
                </View>
              </View>

              {/* Contact Us */}
              {/* <View> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginLeft: 10,
                  marginTop: 20,
                  alignSelf: "center",
                  width: "50%",
                  marginBottom: Dimensions.get("window").height * 0.01,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: "10%",
                    padding: 5,
                    paddingLeft: 10,
                    borderRadius: 20,
                    marginRight: Dimensions.get("window").width * 0.01,
                    backgroundColor: "#F1F1F1",
                  }}
                >
                  <Icons.StarIcon size={23} color="#2B2B2B" />
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").width * 0.045,
                      fontFamily: "Avenir",
                      marginLeft: Dimensions.get("window").width * 0.02,
                      paddingRight: 10,
                    }}
                  >
                    {rating ? rating : "N/R"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Add Reviews section */}
            <View />

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

            <View style={styles.otherBox}>
              <FlatList
                //if there are no reviews, display a message saying there are no reviews
                ListEmptyComponent={
                  <Text style={styles.errorText}>
                    This Tradie Has Not Received Any Reviews
                  </Text>
                }
                data={reviews}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
              />
            </View>
          </>
        }
      />
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton} onPress={onHomePress}>
          <Icons.HomeIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <IconsOutline.CreditCardIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onAnalyticsPress}>
          <IconsOutline.ChartBarIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
