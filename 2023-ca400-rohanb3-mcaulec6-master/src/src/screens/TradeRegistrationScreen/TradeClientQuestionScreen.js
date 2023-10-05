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

export default function TradeClientQuestion({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("TradeLocation");
  };

  const onBackArrowPress = () => {
    navigation.goBack();
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
            Where can your clients find you?
          </Text>
          <Text style={styles.textSetUp2}>
            Tell us a bit more about where you are working so you can be shown
            to the correct clients!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onContinuePress()}
          >
            <Text style={styles.buttonTitle}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
