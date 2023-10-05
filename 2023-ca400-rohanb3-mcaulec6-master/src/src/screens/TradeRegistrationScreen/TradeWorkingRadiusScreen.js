import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
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
import MapView, { Marker, Circle } from "react-native-maps";
import RNPickerSelect from "react-native-picker-select";

export default function TradeWorkingRadius({ navigation }) {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [radius, setRadius] = useState(5000);
  const [latDelta, setLatDelta] = useState(0.009);
  const [lonDelta, setLonDelta] = useState(0.009);
  const [workRadius, setWorkRadius] = useState(0);
  const [geoRadius, setGeoRadius] = useState(0);
  const mapRef = useRef(null);
  const [selectedRadiusLabel, setSelectedRadiusLabel] =
    useState("Select a Radius");
  const [isRadiusSelected, setIsRadiusSelected] = useState(false);

  // set radius
  const onRadiusChange = (newRadius) => {
    setRadius(newRadius);
    setWorkRadius(newRadius);
    setGeoRadius(newRadius);
  };

  useEffect(() => {
    const newLatDelta = (radius / 1000) * 0.009;
    const newLonDelta =
      (radius / 1000) * 0.009 * Math.cos((Math.PI / 180) * location.latitude);
    setLatDelta(newLatDelta);
    setLonDelta(newLonDelta);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: newLatDelta * 2, // Multiply by 2 to show the full circle
          longitudeDelta: newLonDelta * 2, // Multiply by 2 to show the full circle
        },
        1000
      );
    }
  }, [radius, location]);

  const options = [
    { label: "5 km", value: 5000 },
    { label: "10 km", value: 10000 },
    { label: "20 km", value: 20000 },
    { label: "30 km", value: 30000 },
    { label: "40 km", value: 40000 },
    { label: "50 km", value: 50000 },
    { label: "60 km", value: 60000 },
    { label: "70 km", value: 70000 },
    { label: "80 km", value: 80000 },
    { label: "90 km", value: 90000 },
    { label: "100 km", value: 100000 },
  ];

  // radius dropdown picker
  const RadiusDropdown = ({ onRadiusChange }) => {
    return (
      <View style={styles.dropdown}>
        <RNPickerSelect
          style={styles.picker}
          textInputProps={{ style: styles.pickerText }}
          onValueChange={(value) => {
            if (value !== null) {
              const selectedOption = options.find(
                (option) => option.value === value
              );
              if (selectedOption) {
                setSelectedRadiusLabel(selectedOption.label);
              }
              setIsRadiusSelected(true);
            } else {
              setSelectedRadiusLabel("Select a Radius");
              setIsRadiusSelected(false);
            }
            setRadius(value);
          }}
          items={options}
          containerStyle={styles.pickerContainer}
          placeholder={{ label: selectedRadiusLabel, value: null }}
        />
      </View>
    );
  };

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

  const updateLocation = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const lat = location.latitude;
      const lng = location.longitude;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          location: new firebase.firestore.GeoPoint(lat, lng),
          workRadius: radius,
          geoRadius: latDelta,
        })
        .then(() => {
          console.log("Location updated successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useLayoutEffect(() => {
    getLocation();
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("Verification");
    updateLocation();
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
              progress={0.75}
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
            What is your travel distance?
          </Text>
          <Text style={styles.textSetUp3}>
            Add below the maximum distance you'd travel to work.
          </Text>

          <RadiusDropdown
            style={styles.dropdown}
            onRadiusChange={onRadiusChange}
          />

          {location.latitude !== 0 && location.longitude !== 0 && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.4, // initial delta value
                longitudeDelta: 0.4, // initial delta value
              }}
            >
              {radius > 0 && (
                <Circle
                  center={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  radius={radius}
                  fillColor={"rgba(100, 200, 300, 0.2)"}
                  strokeColor={"rgba(100, 100, 169, 0.7)"}
                  strokeWidth={2}
                />
              )}
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
              />
              {radius > 0 && (
                <Circle
                  center={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  radius={radius}
                  fillColor={"rgba(255, 165, 0, 0.2)"}
                  strokeColor={"rgba(255, 165, 0, 0.7)"}
                  strokeWidth={2}
                />
              )}
              {radius > 0 && (
                <Circle
                  center={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  radius={radius * 2} // double the radius to cover full circle
                  strokeColor={"rgba(255, 165, 0, 0.7)"}
                  strokeWidth={2}
                  zIndex={-1} // set zIndex to -1 so that it appears behind the other Circle
                />
              )}
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
            style={[
              styles.button,
              { backgroundColor: isRadiusSelected ? "#232B2B" : "#C0C0C0" },
            ]}
            onPress={onContinuePress}
            disabled={!isRadiusSelected}
          >
            <Text style={styles.buttonTitle}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
