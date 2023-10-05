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

export default function PaymentConfirmationScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onPaymentPress = () => {
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
            marginTop: Dimensions.get("window").height * 0.2,
          }}
        >
          <Icons.ClockIcon style={styles.logo} color="orange" size={100} />
          <Text style={styles.titleConfirm}>Payment Requested</Text>
        </View>

        <TouchableOpacity style={styles.buttonConfirm} onPress={onPaymentPress}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
