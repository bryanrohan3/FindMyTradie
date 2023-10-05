import React, { useLayoutEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import * as Icons from "react-native-heroicons/solid";

export default function AccountTypeScreen({ navigation }) {

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onCustomerPress = () => {
    navigation.navigate("Registration");
  };

  const onTradePress = () => {
    navigation.navigate("TradeRegistration");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {/* Header */}
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
          <TouchableOpacity onPress={onFooterLinkPress}>
            <Icons.ArrowLeftIcon
              style={{
                marginLeft: Dimensions.get("window").width * 0.06,
                color: "black",
              }}
              onPress={onFooterLinkPress}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginRight: Dimensions.get("window").width * 0.06,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Avenir",
                alignContent: "center",
                color: "black",
              }}
            >
              Account Type
            </Text>
          </View>
        </View>

        {/* Ender of Header */}

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: Dimensions.get("window").height * 0.05,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              fontFamily: "Avenir",
              alignContent: "center",
              color: "black",
            }}
          >
            Choose Your Account Type
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Avenir",
              alignContent: "center",
              color: "gray",
              marginBottom: Dimensions.get("window").height * 0.01,
              marginTop: Dimensions.get("window").height * 0.01,
            }}
          >
            Select your role to continue.
          </Text>
        </View>

        {/* Button for Customer account */}
        <TouchableOpacity style={styles.imageButton} onPress={onCustomerPress}>
          <Image
            source={require("../../../assets/office-worker.png")}
            style={styles.image}
          />
          <Text style={styles.buttonTitle}>Customer</Text>
        </TouchableOpacity>

        {/* Button for Tradesman account */}
        <TouchableOpacity style={styles.imageButton} onPress={onTradePress}>
          <Image
            source={require("../../../assets/builder.png")}
            style={styles.image}
          />
          <Text style={styles.buttonTitle}>Tradesman</Text>
        </TouchableOpacity>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
