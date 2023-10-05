import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import { firebase } from "../../firebase/config";

import styles from "./styles";

export default function SearchResultsScreen({ route, navigation }) {
  const { searchResults, trade } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onBackArrowPress = () => {
    navigation.navigate("CustomerHome");
  };

  const onPaymentPress = () => {
    navigation.navigate("ConfirmPayment");
  };

  const onRequestPress = () => {
    navigation.navigate("RequestJob");
  };

  // get {rating} from database
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

  // get {profilePicture} from database
  const [profilePicture, setProfilePicture] = useState(null);
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setProfilePicture(doc.data().profilePicture);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        backgroundColor="#fff"
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            borderBottomColor: "#C0C0C0",
            paddingBottom: "4%",
          }}
        >
          <TouchableOpacity onPress={onBackArrowPress}>
            <Icons.ArrowLeftIcon
              size={30}
              color="black"
              style={{ marginLeft: 25 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginRight: 25 }}>
            <Text
              style={{
                fontSize: Dimensions.get("window").height * 0.023,
                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              Search Results
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 25,
            }}
          ></View>
        </View>

        <Text
          style={{
            fontSize: Dimensions.get("window").height * 0.02,
            fontWeight: "bold",
            marginBottom: Dimensions.get("window").height * 0.02,
            marginLeft: Dimensions.get("window").width * 0.07,
            fontFamily: "Avenir",
            marginBottom: Dimensions.get("window").height * 0.02,
          }}
        >{`${trade}s in your Area`}</Text>

        {/* 1px border */}
        <View
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            width: "100%",
          }}
        />

        <View>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  flexDirection: "row",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("TradePage", { id: item.id })
                }
              >
                <Image
                  source={
                    item.profilePicture
                      ? { uri: item.profilePicture }
                      : require("../../../assets/null2.jpeg")
                  }
                  style={styles.avatarSearch}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.name}>{item.fullName}</Text>
                      {item.verified === "True" && (
                        <Icons.CheckBadgeIcon
                          size={20}
                          color="#1982FC"
                          style={{
                            marginLeft: Dimensions.get("window").width * 0.01,
                          }}
                        />
                      )}
                    </View>
                    <Text style={styles.town}>{item.town_city}</Text>
                  </View>
                </View>
                <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: Dimensions.get("window").width * 0.015,
                      paddingLeft: Dimensions.get("window").width * 0.025,
                      borderRadius: Dimensions.get("window").width * 0.1,
                      backgroundColor: "#F1F1F1",
                      alignItems: "center",
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
            )}
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    fontSize: Dimensions.get("window").height * 0.02,
                    marginLeft: Dimensions.get("window").width * 0.07,
                    marginRight: Dimensions.get("window").width * 0.07,
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                    textAlign: "center",
                    marginTop: Dimensions.get("window").height * 0.1,
                    color: "gray",
                  }}
                >
                  There are no Tradespeople that match your search.
                </Text>
                <Icons.ExclamationCircleIcon
                  size={Dimensions.get("window").height * 0.038}
                  color="gray"
                  style={{
                    alignSelf: "center",
                    marginTop: Dimensions.get("window").height * 0.03,
                  }}
                />
              </View>
            }
          />
        </View>
      </SafeAreaView>
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
