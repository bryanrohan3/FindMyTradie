import React, { useLayoutEffect, useState } from "react";
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
import MapView, { Marker } from "react-native-maps";

export default function CorrectPinScreen({ navigation }) {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const getLocation = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        const data = doc.data();
        const locationData = data.location;
        const location = {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };
        setLocation(location);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    getLocation();
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("TradeWorkingRadius");
  };

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
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
          <TouchableOpacity onPress={onBackArrowPress}>
            <Icons.ArrowLeftIcon
              style={{
                marginLeft: Dimensions.get("window").width * 0.06,
                color: "black",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginRight: Dimensions.get("window").width * 0.07,
            }}
          >
            <Progress.Bar
              progress={0.625}
              width={200}
              style={{
                alignSelf: "center",
                alignContent: "center",
              }}
              color="#232B2B"
            />
          </View>
        </View>

        {/* Enter Location */}

        <View>
          <Text style={styles.titleAboutYou}>
            Is the pin in the correct location?
          </Text>
          <Text style={styles.textSetUp2}>
            If this is not the correct location, please click the back arrow and
            feel free to change it!
          </Text>

          {location.latitude !== 0 && location.longitude !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
              }}
            >
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
              />
            </MapView>
          )}

          <View
            style={{
              height: 1,
              backgroundColor: "#D3D3D3",
              marginTop: 20,
              marginBottom: 1,
              marginRight: 30,
              marginLeft: 30,
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => onContinuePress()}
          >
            <Text style={styles.buttonTitle}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
