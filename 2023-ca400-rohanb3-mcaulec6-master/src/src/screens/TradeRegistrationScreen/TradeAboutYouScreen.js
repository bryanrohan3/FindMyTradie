import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import PhoneInput from "react-native-phone-number-input";

export default function TradeAboutYouScreen({ navigation }) {
  const [name, setName] = useState("");
  const [initialName, setInitialName] = useState(name);
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef(null);
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    setIsInputValid(name !== "" && phone !== "");
  }, [name, phone]);

  React.useEffect(() => {
    setInitialName(name);
  }, [name]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onStartUpPress = () => {
    navigation.navigate("StartSetUp");
  };

  const handlePhoneChange = (number) => {
    const prefix = `+${phoneInputRef.current?.getCallingCode()}`;
    setPhone(`${prefix}${number}`);
  };

  // update phone number in database
  const updatePhone = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ phone: phone })
      .then(() => {
        console.log("Phone number updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update the {fullName} in the database
  const updateName = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ fullName: name })
      .then(() => {
        console.log("Name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onContinuePress = () => {
    navigation.navigate("SelectTrade");
    updatePhone();
    updateName();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        keyboardShouldPersistTaps="always"
      >
        {/* top of screen */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onStartUpPress}>
            <Icons.ArrowLeftIcon
              style={{ marginBottom: 5, marginLeft: 30 }}
              color="#232B2B"
            />
          </TouchableOpacity>
          <Progress.Bar
            progress={0.125}
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
          <Text style={styles.titleAboutYou}>About You</Text>
          <Text style={styles.textSetUp2}>
            Tell us more about yourself and your trade.
          </Text>

          {/* full name input */}
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setName(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          {/* phone number input */}
          <View style={{ marginLeft: 30 }}>
            <PhoneInput
              defaultCode="IE"
              layout="first"
              onChangeText={handlePhoneChange}
              ref={phoneInputRef}
              value={phone}
              containerStyle={styles.borderStyle}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.textInput}
              withDarkTheme
            />
          </View>

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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
