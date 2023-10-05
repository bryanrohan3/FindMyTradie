import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";

export default function TradeRegistrationScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    setIsInputValid(email !== "" && password !== "" && confirmPassword !== "");
  }, [email, password, confirmPassword]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onAccountTypePress = () => {
    navigation.navigate("AccountType");
  };

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          isTradie: true,
          verified: "False",
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("StartSetUp");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onContinuePress = () => {
    onRegisterPress();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
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
          <TouchableOpacity onPress={onAccountTypePress}>
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
              Create Account
            </Text>
          </View>
        </View>

        <Image
          style={styles.logo}
          source={require("../../../assets/builder.png")}
        />

        <Text style={styles.title}>Trade Account</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={false}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={
            isInputValid
              ? styles.button
              : { ...styles.button, backgroundColor: "#C0C0C0" }
          }
          onPress={isInputValid ? onContinuePress : null}
          disabled={!isInputValid}
        >
          <Text style={styles.buttonTitle}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
