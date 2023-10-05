import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function TradeLocationScreen({ navigation }) {
  const [trade, setTrade] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [initialName, setInitialName] = useState(name);
  const [initialHeadline, setInitialHeadline] = useState(headline);
  const [initialLocation, setInitialLocation] = useState(location);
  const [initialTrade, setInitialTrade] = useState(trade);
  const [search, setSearch] = useState("");
  const [locationName, setLocationName] = useState("");

  React.useEffect(() => {
    setInitialName(name);
    setInitialHeadline(headline);
    setInitialLocation(location);
    setInitialTrade(trade);
  }, [name, headline, location, trade]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onContinuePress = () => {
    navigation.navigate("CorrectPin");

  };

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
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
            progress={0.5}
            width={200}
            style={{
              alignSelf: "center",
              alignContent: "center",
            }}
            color="#232B2B"
          />
        </View>
      </View>

      <KeyboardAwareFlatList
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
        renderItem={null}
        data={[]}
        ListHeaderComponent={
          <>
            {/* ... */}

            {/* Enter Location */}

            <View>
              <Text style={styles.titleAboutYou}>
                Enter the location you work in
              </Text>
              <Text style={styles.textSetUp2}>
                Show clients that you're in their area and availible for
                booking.
              </Text>

              <GooglePlacesAutocomplete
                placeholder="Search, e.g. Ballymun, Dublin"
                minLength={2}
                autoFocus={false}
                returnKeyType={"search"}
                listViewDisplayed="auto"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  setLocationName(details.formatted_address);
                  const location = details.geometry.location;
                  const latitude = location.lat;
                  const longitude = location.lng;
                  const locationName = details.formatted_address;

                  const userId = firebase.auth().currentUser.uid;
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(userId)
                    .update({
                      location: new firebase.firestore.GeoPoint(
                        latitude,
                        longitude
                      ),
                      town_city: locationName,
                    })
                    .then(() => {
                      console.log(
                        "Location and town_city updated successfully"
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                renderDescription={(row) => row.description}
                getDefaultValue={() => search}
                query={{
                  key: "AIzaSyAI1xH1dftj8RuOz42zvhhHZ45PPqHy7oU",
                  language: "en",
                  components: "country:ie",
                }}
                styles={{
                  textInputContainer: {
                    height: 48,
                    width: "85%",
                    marginLeft: 30,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#D3D3D3",
                    borderRadius: 5,
                  },
                  description: {
                    width: "85%",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
                currentLocation={false}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
                GoogleReverseGeocodingQuery={{}}
                GooglePlacesSearchQuery={{
                  rankby: "distance",
                  types: "food",
                }}
                filterReverseGeocodingByTypes={[
                  "locality",
                  "administrative_area_level_3",
                ]}
                debounce={200}
              />

              {/* AIzaSyAI1xH1dftj8RuOz42zvhhHZ45PPqHy7oU */}

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
                  locationName
                    ? {}
                    : { backgroundColor: "#D3D3D3", borderColor: "#D3D3D3" },
                ]}
                onPress={() => onContinuePress()}
                disabled={!locationName}
              >
                <Text style={styles.buttonTitle}>Continue</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}
