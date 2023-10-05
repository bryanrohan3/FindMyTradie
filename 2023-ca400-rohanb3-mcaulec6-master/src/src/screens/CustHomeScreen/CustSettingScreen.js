import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase, storage } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CustSettingScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const phoneInputRef = useRef(null);
  const user = firebase.auth().currentUser;
  const [currentEmail, setCurrentEmail] = useState(user.email);
  const [fullName, setFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const getUserData = async () => {
    const userId = firebase.auth().currentUser.uid;
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    const userData = doc.data();
    setFullName(userData.fullName);
  };

  const reauthenticateUser = async (currentPassword) => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.log("User not found.");
        return false;
      }

      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);
      return true;
    } catch (error) {
      console.log("Error re-authenticating user:", error);
      return false;
    }
  };

  const showDeleteAccountConfirmation = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: deleteAccount,
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = async () => {
    const userId = firebase.auth().currentUser.uid;
    try {
      // Delete the Firebase authentication account
      await user.delete();
      console.log("Firebase authentication account deleted");

      // Sign out the user and navigate back to the login screen
      await firebase.auth().signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error deleting user account:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateEmail = async (newEmail, user) => {
    try {
      await user.updateEmail(newEmail);
      console.log("Email updated successfully");
    } catch (error) {
      console.log("Error updating email: ", error);
    }
  };

  const handlePasswordUpdate = async (newPassword, user) => {
    try {
      await user.updatePassword(newPassword);
      console.log("Password updated successfully");
    } catch (error) {
      console.log("Error updating password:", error);
    }
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      uploadImage(selectedImage.uri);
    }
  }

  async function uploadImage(uri) {
    const userId = firebase.auth().currentUser.uid;
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storageRef(storage, `profilePictures/${userId}`);
    const uploadTask = uploadBytesResumable(ref, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Show progress (optional)
      },
      (error) => {
        // Handle errors
        console.log(error);
        alert("Upload failed");
      },
      () => {
        // On successful upload
        getDownloadURL(ref).then((downloadURL) => {
          saveImageUrlToFirestore(downloadURL);
        });
      }
    );
  }

  async function saveImageUrlToFirestore(imageUrl) {
    const userId = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(userId).update({
      profilePicture: imageUrl,
    });

    await firebase
      .firestore()
      .collection("jobs")
      .where("customerId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            customerProfilePicture: imageUrl,
          });
        });
      });

    await firebase
      .firestore()
      .collection("payments")
      .where("customerId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            customerProfilePicture: imageUrl,
          });
        });
      });

    await firebase
      .firestore()
      .collection("reviews")
      .where("customerId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            customerProfilePicture: imageUrl,
          });
        });
      });

    alert("Profile picture updated successfully");
  }

  const [imageUrl, setImageUrl] = useState(null);
  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const fetchData = async () => {
      const doc = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const data = doc.data();
      setImageUrl(data.profilePicture);
    };

    fetchData();
  }, []);


  const updateFullName = async (newFullName, user) => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ fullName: fullName })
      .then(() => {
        console.log("Full name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEmailInDatabase = async (uid, newEmail) => {
    try {
      const userRef = firebase.firestore().collection("users").doc(uid);
      await userRef.update({
        email: newEmail,
      });
      console.log("Email updated in database successfully");
    } catch (error) {
      console.log("Error updating email in database:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // new approach
  const handleUpdateEmail = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.log("User not found.");
        return;
      }

      if (currentPassword !== "") {
        const reauthenticatedUser = await reauthenticateUser(currentPassword);
        if (reauthenticatedUser) {
          // Force token refresh
          await reauthenticatedUser.getIdTokenResult(true);

          await updateEmail(currentEmail, reauthenticatedUser);
          await updateEmailInDatabase(reauthenticatedUser.uid, currentEmail);
        } else {
          Alert.alert(
            "Incorrect Password",
            "The current password you entered is incorrect."
          );
        }
      } else {
        // Force token refresh
        await user.getIdTokenResult(true);

        await updateEmail(currentEmail, user);
        await updateEmailInDatabase(user.uid, currentEmail);
      }
    } catch (error) {
      console.log("Error updating email:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert(
          "Password Mismatch",
          "New Password and Confirm Password do not match."
        );
        return;
      }

      const user = firebase.auth().currentUser;

      if (!user) {
        console.log("User not found.");
        return;
      }

      if (currentPassword !== "") {
        const isAuthenticated = await reauthenticateUser(currentPassword);
        if (isAuthenticated) {
          const updatedUser = firebase.auth().currentUser;
          await handlePasswordUpdate(password, updatedUser);
        } else {
          Alert.alert(
            "Incorrect Password",
            "The current password you entered is incorrect."
          );
        }
      } else {
        await handlePasswordUpdate(password, user);
      }
    } catch (error) {
      console.log("Error updating password:", error);
    }
  };

  const updateFullNameInDatabase = async (uid, newFullName) => {
    try {
      const userRef = firebase.firestore().collection("users").doc(uid);
      await userRef.update({
        fullName: newFullName,
      });
      console.log("Full name updated in database successfully");
    } catch (error) {
      console.log("Error updating full name in database:", error);
    }
  };

  const handleUpdateFullName = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.log("User not found.");
        return;
      }

      if (currentPassword !== "") {
        const reauthenticatedUser = await reauthenticateUser(currentPassword);
        if (reauthenticatedUser) {
          await updateFullName(fullName, reauthenticatedUser);
          await updateFullNameInDatabase(reauthenticatedUser.uid, fullName);
        } else {
          Alert.alert(
            "Incorrect Password",
            "The current password you entered is incorrect."
          );
        }
      } else {
        await updateFullName(fullName, user);
        await updateFullNameInDatabase(user.uid, fullName);
      }
    } catch (error) {
      console.log("Error updating full name:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <Text style={styles.settings}>Settings</Text>
        <View style={{ width: Dimensions.get("window").height * 0.03 }} />
        <TouchableOpacity
          style={{
            marginRight: Dimensions.get("window").width * 0.05,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icons.XCircleIcon
            style={
              {
                // marginTop: Dimensions.get("window").height * 0.01,
              }
            }
            size={Dimensions.get("window").height * 0.03}
            color="#3b444c"
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        backgroundColor="#fff"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {/* Profile Picture */}
          <View style={{ position: "relative" }}>
            <Image
              //if user has no profile picture, use default
              source={
                imageUrl
                  ? { uri: imageUrl }
                  : require("../../../assets/null2.jpeg")
              }
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "black",
                marginTop: Dimensions.get("window").height * 0.02,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                borderRadius: 100,
                padding: 7,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "black",
                marginTop: Dimensions.get("window").height * 0.135,
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                <Icons.CameraIcon
                  size={Dimensions.get("window").height * 0.03}
                  style={{ width: 30, height: 30, color: "#2B2B2B" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              marginLeft: 30,
              marginTop: Dimensions.get("window").height * 0.02,
              fontFamily: "Avenir",
              fontWeight: "bold",
            }}
          >
            Edit Profile Details
          </Text>
          <View style={{ marginLeft: "auto", marginRight: 30 }}>
            <TouchableOpacity onPress={handleUpdateFullName}>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginTop: Dimensions.get("window").height * 0.02,
                }}
              >
                <Text
                  style={{
                    fontSize: Dimensions.get("window").height * 0.015,
                    fontFamily: "Avenir",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*  Full Name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Icons.UserIcon
            style={{
              marginLeft: 20,
              width: 10,
              height: 10,
              color: "lightgray",
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              paddingLeft: 10,
              color: "blac",
              width: Dimensions.get("window").width * 0.78,
              height: Dimensions.get("window").height * 0.05,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
            }}
            placeholder={`${fullName}`}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: Dimensions.get("window").height * 0.01,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              marginLeft: 30,
              marginTop: Dimensions.get("window").height * 0.05,
              fontFamily: "Avenir",
              fontWeight: "bold",
            }}
          >
            Update Email
          </Text>
          <View style={{ marginLeft: "auto", marginRight: 30 }}>
            <TouchableOpacity onPress={handleUpdateEmail}>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginTop: Dimensions.get("window").height * 0.05,
                }}
              >
                <Text
                  style={{
                    fontSize: Dimensions.get("window").height * 0.015,
                    fontFamily: "Avenir",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/*  Email */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Icons.EnvelopeIcon
            style={{
              marginLeft: 20,
              width: 10,
              height: 10,
              color: "lightgray",
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              paddingLeft: 10,
              color: "#2b2b2b",
              width: Dimensions.get("window").width * 0.78,
              height: Dimensions.get("window").height * 0.05,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              fontFamily: "Avenir",
            }}
            placeholder={`${currentEmail}`}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setCurrentEmail(text)} // update currentEmail state variable
            value={currentEmail} // use currentEmail state variable
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: Dimensions.get("window").height * 0.01,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              marginLeft: 30,
              marginTop: Dimensions.get("window").height * 0.05,
              fontFamily: "Avenir",
              fontWeight: "bold",
            }}
          >
            Update Password
          </Text>
          <View style={{ marginLeft: "auto", marginRight: 30 }}>
            <TouchableOpacity onPress={handleUpdatePassword}>
              <View
                style={{
                  backgroundColor: "#f2f2f2",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginTop: Dimensions.get("window").height * 0.05,
                }}
              >
                <Text
                  style={{
                    fontSize: Dimensions.get("window").height * 0.015,
                    fontFamily: "Avenir",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Icons.LockClosedIcon
            style={{
              marginLeft: 20,
              width: 10,
              height: 10,
              color: "lightgray",
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              paddingLeft: 10,
              color: "lightgray",
              width: Dimensions.get("window").width * 0.78,
              height: Dimensions.get("window").height * 0.05,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              fontFamily: "Avenir",
            }}
            placeholder="Current Password"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setCurrentPassword(text)}
            value={currentPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        {/*  Password */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Icons.LockClosedIcon
            style={{
              marginLeft: 20,
              width: 10,
              height: 10,
              color: "lightgray",
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              paddingLeft: 10,
              color: "lightgray",
              width: Dimensions.get("window").width * 0.78,
              height: Dimensions.get("window").height * 0.05,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              fontFamily: "Avenir",
            }}
            placeholder="New Password"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Icons.LockClosedIcon
            style={{
              marginLeft: 20,
              width: 10,
              height: 10,
              color: "lightgray",
              marginRight: 10,
            }}
          />
          <TextInput
            style={{
              paddingLeft: 10,
              color: "lightgray",
              width: Dimensions.get("window").width * 0.78,
              height: Dimensions.get("window").height * 0.05,
              borderBottomWidth: 1,
              borderBottomColor: "lightgray",
              fontFamily: "Avenir",
            }}
            placeholder="Confirm Password"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        {/* Log out button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 30,
            marginTop: Dimensions.get("window").height * 0.02,
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 5,
            marginTop: Dimensions.get("window").height * 0.05,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Icons.ArrowRightCircleIcon
            style={{
              color: "black",
              fontSize: 20,
              marginRight: Dimensions.get("window").width * 0.02,
              marginLeft: Dimensions.get("window").width * 0.02,
            }}
            size={Dimensions.get("window").height * 0.025}
          />
          <Text
            style={{
              flex: 1,
              color: "black",
              fontFamily: "Avenir",
              marginLeft: Dimensions.get("window").width * 0.02,
              fontSize: Dimensions.get("window").height * 0.017,
              paddingTop: Dimensions.get("window").height * 0.004,
              paddingBottom: Dimensions.get("window").height * 0.004,
            }}
          >
            Log Out
          </Text>
          <Icons.ChevronRightIcon
            style={{
              color: "#c0c0c0",
              fontSize: 20,
              marginLeft: 10,
            }}
            size={Dimensions.get("window").height * 0.025}
          />
        </TouchableOpacity>
        {/* 1 px line */}

        <Text
          style={{
            fontSize: 17,
            marginLeft: 30,
            marginTop: Dimensions.get("window").height * 0.04,
            fontFamily: "Avenir",
            fontWeight: "bold",
          }}
        >
          Dangerous Area
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 30,
            marginTop: Dimensions.get("window").height * 0.02,
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 5,
          }}
          onPress={showDeleteAccountConfirmation}
        >
          <Icons.TrashIcon
            style={{
              color: "black",

              marginRight: Dimensions.get("window").width * 0.02,
              marginLeft: Dimensions.get("window").width * 0.02,
            }}
            size={Dimensions.get("window").height * 0.025}
          />
          <Text
            style={{
              flex: 1,
              color: "black",
              fontFamily: "Avenir",
              marginLeft: Dimensions.get("window").width * 0.02,
              fontSize: Dimensions.get("window").height * 0.017,
              paddingTop: Dimensions.get("window").height * 0.004,
              paddingBottom: Dimensions.get("window").height * 0.004,
            }}
          >
            Delete Account
          </Text>
          <Icons.ChevronRightIcon
            style={{
              color: "#c0c0c0",
              fontSize: 20,
              marginLeft: 10,
            }}
            size={Dimensions.get("window").height * 0.025}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: Dimensions.get("window").height * 0.014,
            marginLeft: 30,
            marginTop: Dimensions.get("window").height * 0.01,
            fontFamily: "Avenir",
            color: "#c0c0c0",
            flexWrap: "wrap",
            width: Dimensions.get("window").width * 0.85,
            marginBottom: Dimensions.get("window").height * 0.05,
          }}
        >
          If you delete your account, you will lose all your data and will not
          be able to recover it.
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
