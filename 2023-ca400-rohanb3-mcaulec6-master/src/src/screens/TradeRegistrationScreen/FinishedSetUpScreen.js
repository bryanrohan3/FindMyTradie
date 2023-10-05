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
import * as Icons from "react-native-heroicons/outline";

export default function FinshedSetUpScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.containerConfirmation}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            alignItems: "center",
            marginTop: Dimensions.get("window").height * 0.25,
          }}
        >
          <Icons.CheckCircleIcon
            style={styles.logo}
            color="#2B2B2B"
            size={100}
          />
          <Text style={styles.titleCongrats}>
            Congratulations You're All Set
          </Text>
          <Text style={styles.subtitleConfirm}>
            We're excited to have you on board!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buttonConfirm}
          onPress={onContinuePress}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
