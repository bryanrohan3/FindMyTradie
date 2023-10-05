import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import Modal from "react-native-modal";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("AccountType");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            if (firestoreDocument.data().isTradie == false) {
              navigation.navigate("CustomerHome");
            } else {
              navigation.navigate("Home");
            }
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert("Invalid email or password");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SafeAreaView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
          backgroundColor="#fff"
        >
          <Text style={styles.title}>FindMyTradie</Text>
          <Text style={styles.slogan}>Discover quality tradesmen near you</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="off"
            selectionColor={"gray"}
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
            autoCompleteType="off"
            selectionColor={"gray"}
          />
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>

          <Modal isVisible={showModal}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Forgot Password?</Text>
              <Text style={styles.resetInstructions}>
                No worries! We'll send you reset instructions.
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="E-mail"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setForgotPasswordEmail(text)}
                value={forgotPasswordEmail}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCompleteType="off"
                selectionColor={"gray"}
                autoCorrect={false}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalCancelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    firebase
                      .auth()
                      .sendPasswordResetEmail(forgotPasswordEmail)
                      .then(() => {
                        Alert.alert(
                          "Password Reset",
                          "An email has been sent to reset your password."
                        );
                        setShowModal(false);
                      })
                      .catch((error) => {
                        alert(error.message);
                      });
                  }}
                >
                  <Text style={styles.modalButtonTitle}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}
