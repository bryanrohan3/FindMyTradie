import React, { useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as Icons from "react-native-heroicons/solid";

export default function StartSetUpScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onStartUpPress = () => {
    navigation.navigate("TradeAboutYou");
  };

  const onBackArrowPress = () => {
    navigation.navigate("TradeRegistration");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
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
        </View>

        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.25,
          }}
        >
          <Text style={styles.titleSetUp}>
            Set Up Your FindMyTradie Profile
          </Text>
          <Text style={styles.textSetUp2}>
            It looks like you're new here. Lets get you your profile set up on
            FindMyTradie!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onStartUpPress()}
          >
            <Text style={styles.buttonTitle}>START SETUP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
