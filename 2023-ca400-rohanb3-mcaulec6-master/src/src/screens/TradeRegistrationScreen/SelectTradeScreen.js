import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";

export default function SelectTradeScreen({ navigation }) {
  const [trade, setTrade] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [initialName, setInitialName] = useState(name);
  const [initialHeadline, setInitialHeadline] = useState(headline);
  const [initialLocation, setInitialLocation] = useState(location);
  const [initialTrade, setInitialTrade] = useState(trade);
  const [selected, setSelected] = useState(null);
  const [clicked, setClicked] = useState(false);

  React.useEffect(() => {
    setInitialName(name);
    setInitialHeadline(headline);
    setInitialLocation(location);
    setInitialTrade(trade);
  }, [name, headline, location, trade]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setClicked(false);
    });

    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onBackArrowPress = () => {
    navigation.navigate("TradeAboutYou");
  };

  // update the {trade} in the database
  const updateTrade = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ trade })
      .then(() => {
        console.log("Trade updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePress = (index) => {
    if (!clicked) {
      setClicked(true);
      setSelected(index);
      const trade = [
        "Bricklayer",
        "Plumber",
        "Electrician",
        "Carpenter",
        "Painter",
      ][index];
      setTrade(trade);

      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({ trade: trade })
        .then(() => {
          console.log("Trade updated successfully");
          navigation.navigate("TradeSkills", { trade: trade });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="always"
      >
        {/* top of screen */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onBackArrowPress} testID={"backButton"}>
            <Icons.ArrowLeftIcon
              style={{ marginBottom: 5, marginLeft: 30 }}
              color="#232B2B"
            />
          </TouchableOpacity>
          <Progress.Bar
            progress={0.25}
            width={200}
            style={{ marginLeft: 60 }}
            color="#232B2B"
          />
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#D3D3D3",
            marginTop: 15,
            marginBottom: 5,
          }}
        />

        {/* about you */}

        <View>
          <Text style={styles.titleAboutYou}>What is your Primary Trade?</Text>
          <Text style={styles.textSetUp2}>
            Select a trade from below that will help customers find you when
            they're browsing for services.
          </Text>

          {/* Add code here */}

          <View
            style={[
              styles.squareContainer,
              { justifyContent: "space-between" },
            ]}
          >
            {[
              "Bricklayer",
              "Plumber",
              "Electrician",
              "Carpenter",
              "Painter",
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.selectTradeButton,
                  {
                    borderColor: selected === index ? "black" : "lightgray",
                  },
                  { borderWidth: selected === index ? 1 : 0 },
                ]}
                onPress={() => {
                  handlePress(index);
                  if (!clicked) {
                    setClicked(true);
                    navigation.navigate("TradeSkills", { trade });
                  }
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.squareText, { width: 120 }]}>
                    {item}
                  </Text>
                  <Icons.ChevronRightIcon
                    color="#232B2B"
                    style={{
                      marginLeft: Dimensions.get("window").width * 0.1,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
