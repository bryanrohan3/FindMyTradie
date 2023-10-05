import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import RNPickerSelect from "react-native-picker-select";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

export default function CustHomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [isImageBig, setIsImageBig] = useState(false);
  const [circleColor, setCircleColor] = useState("transparent");
  const [verified, setVerified] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [userLocation, setUserLocation] = useState(null);
  const [tradesmenLocations, setTradesmenLocations] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [highToLowFilter, setHighToLowFilter] = useState(false);
  const [lowToHighFilter, setLowToHighFilter] = useState(false);

  const toggleFilter = (filterName) => {
    switch (filterName) {
      case "verified":
        setVerifiedFilter(!verifiedFilter);
        break;
      case "highToLow":
        setHighToLowFilter(!highToLowFilter);
        setLowToHighFilter(false);
        break;
      case "lowToHigh":
        setLowToHighFilter(!lowToHighFilter);
        setHighToLowFilter(false);
        break;
    }
  };

  const [profilePicture, setProfilePicture] = useState(null);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setProfilePicture(doc.data().profilePicture);
      });
  }, []);

  // status bar
  StatusBar.setBarStyle("dark-content", true);

  // get user location
  const requestUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  React.useEffect(() => {
    requestUserLocation();
  }, []);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("isTradie", "==", true)
      .onSnapshot((querySnapshot) => {
        const tradesmenData = [];
        querySnapshot.forEach((doc) => {
          const tradesman = doc.data();
          if (
            tradesman.location &&
            tradesman.location.latitude &&
            tradesman.location.longitude
          ) {
            tradesmenData.push({ ...tradesman, id: doc.id });
          }
        });

        setTradesmenLocations(tradesmenData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  function haversineDistance(coord1, coord2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    const lat1 = coord1.lat || coord1.latitude;
    const lon1 = coord1.long || coord1.longitude;
    const lat2 = coord2.lat || coord2.latitude;
    const lon2 = coord2.long || coord2.longitude;

    const R = 6371; // km
    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  const handleTradeSelect = (value) => {
    setSelectedTrade(value.value);
    setModalVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
  };

  //check if user is verified
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setVerified(doc.data().verified);
      });
  }, []);

  // christain's code
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationChange = (data, details) => {
    setSearchLocation({
      long: details.geometry.location.lng,
      lat: details.geometry.location.lat,
    });
  };

  // Search for Tradesmen in DB
  const applyFilters = (tradesmen) => {
    let filteredTradesmen = tradesmen;

    if (verifiedFilter) {
      filteredTradesmen = filteredTradesmen.filter(
        (tradesman) => tradesman.verified === "True"
      );
    }

    if (highToLowFilter) {
      filteredTradesmen.sort((a, b) => b.rating - a.rating);
    } else if (lowToHighFilter) {
      filteredTradesmen.sort((a, b) => a.rating - b.rating);
    }

    return filteredTradesmen;
  };

  const handleSearch = () => {
    firebase
      .firestore()
      .collection("users")
      .where("trade", "==", selectedTrade)
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          const tradesman = doc.data();

          const distance = haversineDistance(
            searchLocation,
            tradesman.location
          );

          const defaultWorkRadius = 20;
          const workRadius = tradesman.workRadius
            ? tradesman.workRadius / 1000
            : defaultWorkRadius;

          if (distance <= workRadius) {
            data.push({ ...tradesman, id: doc.id });
          }
        });

        const filteredData = applyFilters(data);

        // Navigate to SearchResultsScreen and pass the search results data
        navigation.navigate("SearchResults", {
          searchResults: filteredData,
          trade: selectedTrade,
        });
      })
      .catch((error) => console.log(error));
  };


  // get the {fullName} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setName(doc.data().fullName);
      });
  }, []);

  // when the page refreshes the user is still logged in
  // so we need to check if the user is logged in
  // if they are, we need to navigate them to the home screen
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("CustomerHome");
      }
    });
  }, []);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setImageUrl(doc.data().profilePicture);
      });
  }, []);

  // log the user out
  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // when the user clicks on the image icon, it will navigate to the ProfileScreen
  const onProfileImagePress = () => {
    navigation.toggleDrawer();
  };

  const onPaymentPress = () => {
    navigation.navigate("ConfirmPayment");
  };

  const onRequestPress = () => {
    navigation.navigate("RequestJob");
  };

  //sort by rating high to low in search results
  // Sorting function
  const sortByRating = (a, b) => b.rating - a.rating;

  // Sort the data array by rating (high to low)
  const sortedData = searchResults.sort(sortByRating);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        backgroundColor="#fff"
      >
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
          <TouchableOpacity onPress={onProfileImagePress}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("../../../assets/null2.jpeg")
              }
              style={{
                width: 40,
                height: 40,
                marginLeft: 25,
                borderRadius: 20,
                borderColor: circleColor,
                borderWidth: 2,
                marginBottom: "4%",
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: Dimensions.get("window").width * 0.06,
                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              FindMyTradie
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 25,
            }}
          >
            <TouchableOpacity onPress={onSettingsPress}>
              <Icons.Cog8ToothIcon size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/*  Search Bar for trade */}
        <ImageBackground
          source={require("../../../assets/background.png")}
          style={{
            width: "100%",
            height: 330,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", zIndex: 1 }}
          >
            <TouchableOpacity
              style={{
                height: 49,
                width: Dimensions.get("window").width - 60,
                borderColor: "lightgray",
                borderRadius: 60,
                borderBottomWidth: 0.5,
                overflow: "hidden",
                backgroundColor: "white",
                marginBottom: 10,
                marginLeft: 30,
                marginTop: "5%",
              }}
              onPress={() => setModalVisible(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: screenWidth * 0.05,
                  marginTop: screenWidth * 0.03,
                }}
              >
                <Icons.MagnifyingGlassIcon
                  size={screenWidth * 0.06}
                  style={{
                    marginRight: screenWidth * 0.03,
                    color: "#C0C0C0",
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: screenWidth * 0.01,
                    color: "#C0C0C0",
                    placeholderTextColor: "#A0A0A0",
                    fontSize: screenWidth * 0.04,
                  }}
                >
                  {selectedTrade
                    ? selectedTrade
                    : "What Trade Are You Looking For?"}
                </Text>
              </View>
            </TouchableOpacity>

            <Modal
              // size of Modal
              deviceHeight={Dimensions.get("window").height}
              deviceWidth={Dimensions.get("window").width}
              // Modal is visible or not
              visible={modalVisible}
              // Animation of Modal
              animationType="slide"
              backgroundColor="white"
              swipeDirection="down"
              animationIn={"slideInUp"}
              animationOut={"slideOutDown"}
              onBackdropPress={() => setModalVisible(false)}
              hasBackdrop={true}
              backdropColor="black"
              backdropOpacity={0.5}
              // Modal style
              borderTopLeftRadius={30}
              borderTopRightRadius={30}
              style={{
                justifyContent: "flex-start",
                padding: 0,
                margin: 0,
                flex: 1,
                marginTop: screenHeight * 0.075,
              }}
            >
              <Icons.MinusIcon
                size={60}
                color="#232B2B"
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                }}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: "gray",
                      marginBottom: 5,
                      paddingLeft: 20,
                    }}
                  >
                    {/* What Trade Are You Looking For? */}
                  </Text>
                </View>

                <View>
                  {/* Enter your location */}
                  <Text
                    style={{
                      fontSize: screenWidth * 0.04,
                      color: "#232B2B",
                      fontWeight: "500",
                      marginLeft: screenWidth * 0.08,
                      fontFamily: "Avenir",
                    }}
                  >
                    Enter your location
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Search Bar for location */}
                    <GooglePlacesAutocomplete
                      placeholder="Where? e.g. Ballymun, Dublin"
                      // add an icons.mappinicon to the left of the input
                      renderLeftButton={() => (
                        <View
                          style={{
                            marginLeft: 0,
                            marginTop: screenWidth * 0.03,
                          }}
                        >
                          <Icons.MapPinIcon
                            size={screenWidth * 0.05}
                            style={{
                              color: "#C0C0C0",
                              marginLeft: screenWidth * 0.03,
                            }}
                          />
                        </View>
                      )}
                      placeholderTextColor="lightgray"
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={"search"}
                      listViewDisplayed="auto"
                      fetchDetails={true}
                      onChangeText={handleLocationChange}
                      renderDescription={(row) => row.description}
                      onPress={handleLocationChange}
                      getDefaultValue={() => search}
                      query={{
                        key: "AIzaSyAI1xH1dftj8RuOz42zvhhHZ45PPqHy7oU",
                        language: "en",
                        components: "country:ie",
                      }}
                      styles={{
                        textInputContainer: {
                          height: screenWidth * 0.12,
                          width: Dimensions.get("window").width - 60,
                          borderColor: "lightgray",
                          borderWidth: 1,
                          borderRadius: 5,
                          overflow: "hidden",
                          backgroundColor: "white",
                          marginBottom: 10,
                          marginLeft: screenWidth * 0.07,
                          marginTop: screenWidth * 0.03,
                        },
                        textInput: {
                          paddingLeft: 16,
                          color: "#696969",
                          placeholderTextColor: "#A0A0A0",
                          marginTop: screenWidth * 0.005,
                          fontSize: 16,
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
                      // AIzaSyAI1xH1dftj8RuOz42zvhhHZ45PPqHy7oU

                      filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3",
                      ]}
                      debounce={200}
                    />
                  </View>

                  {/* Select your trade */}
                  <Text
                    style={{
                      fontSize: screenWidth * 0.04,
                      color: "#232B2B",
                      fontWeight: "500",
                      marginLeft: screenWidth * 0.08,
                      fontFamily: "Avenir",
                    }}
                  >
                    Select your trade
                  </Text>

                  {/* Picker to select the Trade */}
                  <RNPickerSelect
                    style={styles.picker}
                    textInputProps={{ style: styles.pickerText }}
                    onValueChange={(value) => setSelectedTrade(value)}
                    items={[
                      { label: "Carpenter", value: "Carpenter" },
                      { label: "Electrician", value: "Electrician" },
                      { label: "Plumber", value: "Plumber" },
                      { label: "Bricklayer", value: "Bricklayer" },
                      { label: "Painter", value: "Painter" },
                    ]}
                    placeholder={{
                      label: "What Trade Are You Looking For?",
                      value: null,
                    }}
                    containerStyle={styles.pickerContainer}
                    underlineColorAndroid="transparent"
                    multiple={true}
                    value={selectedTrade}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: verifiedFilter
                            ? "#232B2B"
                            : "lightgray",
                          borderRadius: 5,
                          padding: 10,
                          marginRight: Dimensions.get("window").width * 0.05,
                          marginTop: Dimensions.get("window").width * 0.05,
                        },
                      ]}
                      onPress={() => toggleFilter("verified")}
                    >
                      <Text
                        style={{
                          color: verifiedFilter ? "white" : "black",
                          fontFamily: "Avenir",
                        }}
                      >
                        Verified
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: highToLowFilter
                            ? "#232B2B"
                            : "lightgray",
                          borderRadius: 5,
                          padding: 10,
                          marginRight: Dimensions.get("window").width * 0.05,
                          marginTop: Dimensions.get("window").width * 0.05,
                        },
                      ]}
                      onPress={() => toggleFilter("highToLow")}
                    >
                      <Text
                        style={{
                          color: highToLowFilter ? "white" : "black",
                          fontFamily: "Avenir",
                        }}
                      >
                        High to Low
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: lowToHighFilter
                            ? "#232B2B"
                            : "lightgray",
                          borderRadius: 5,
                          padding: 10,
                          marginTop: Dimensions.get("window").width * 0.05,
                        },
                      ]}
                      onPress={() => toggleFilter("lowToHigh")}
                    >
                      <Text
                        style={{
                          color: lowToHighFilter ? "white" : "black",
                          fontFamily: "Avenir",
                        }}
                      >
                        Low to High
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#232B2B",
                      width: screenWidth * 0.8,
                      height: screenWidth * 0.12,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginTop: screenWidth * 0.05,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      handleSearch();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: screenWidth * 0.04,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        fontSize: screenWidth * 0.04,
                      }}
                    >
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.045,
              fontWeight: "bold",
              color: "#232B2B",
              marginLeft: Dimensions.get("window").width * 0.05,
              marginTop: Dimensions.get("window").width * 0.06,
              fontFamily: "Avenir",
            }}
          >
            Around You
          </Text>
          {userLocation && (
            <MapView
              style={{
                height: Dimensions.get("window").height * 0.25,
                marginLeft: Dimensions.get("window").width * 0.05,
                marginTop: Dimensions.get("window").width * 0.02,
                marginRight: Dimensions.get("window").width * 0.05,
                borderRadius: 10,
              }}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            >
              {tradesmenLocations
                .filter(
                  (tradesman) =>
                    haversineDistance(userLocation, {
                      latitude: tradesman.location.latitude,
                      longitude: tradesman.location.longitude,
                    }) < 50
                )
                .map((tradesman) => (
                  <Marker
                    key={tradesman.id}
                    coordinate={{
                      latitude: tradesman.location.latitude,
                      longitude: tradesman.location.longitude,
                    }}
                    title={tradesman.fullName}
                  >
                    <Callout
                      onPress={() =>
                        navigation.navigate("TradePage", { id: tradesman.id })
                      }
                    >
                      <View
                        style={{
                          marginLeft: Dimensions.get("window").width * 0.05,
                          marginTop: Dimensions.get("window").width * 0.04,
                          width: Dimensions.get("window").width * 0.3,
                        }}
                      >
                        <Image
                          source={
                            tradesman.profilePicture
                              ? { uri: tradesman.profilePicture }
                              : require("../../../assets/null2.jpeg")
                          }
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginBottom: 10,
                          }}
                        />

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: Dimensions.get("window").width * 0.03,
                              fontFamily: "Avenir",
                            }}
                          >
                            {tradesman.fullName}
                          </Text>
                          {tradesman.verified === "True" ? (
                            <Icons.CheckBadgeIcon
                              size={Dimensions.get("window").width * 0.035}
                              style={{
                                marginLeft:
                                  Dimensions.get("window").width * 0.01,
                              }}
                            // Add any additional style or properties needed for the icon
                            />
                          ) : null}
                        </View>

                        <Text
                          style={{
                            fontSize: Dimensions.get("window").width * 0.03,
                            fontFamily: "Avenir",
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          {tradesman.trade}
                        </Text>
                        <Text
                          style={{
                            fontSize: Dimensions.get("window").width * 0.03,
                            fontFamily: "Avenir",
                            color: "ligthgray",
                            fontStyle: "italic",
                          }}
                        >
                          {tradesman.town_city}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icons.StarIcon
                            style={{
                              width: Dimensions.get("window").width * 0.03,
                              height: Dimensions.get("window").width * 0.03,
                              marginRight:
                                Dimensions.get("window").width * 0.01,
                              marginBottom:
                                Dimensions.get("window").width * 0.005,
                            }}
                            color={"black"}
                            size={Dimensions.get("window").width * 0.035}
                          />
                          <Text
                            style={{
                              fontSize: Dimensions.get("window").width * 0.03,
                              fontFamily: "Avenir",
                            }}
                          >
                            {tradesman.rating ? tradesman.rating : "N/A"}
                          </Text>
                        </View>
                      </View>
                    </Callout>
                  </Marker>
                ))}
            </MapView>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton}>
          <Icons.MagnifyingGlassIcon
            style={styles.tabButtonIcon}
            color="black"
          />
          <Text style={styles.tabButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onRequestPress}>
          <IconsOutline.BriefcaseIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <IconsOutline.CreditCardIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
