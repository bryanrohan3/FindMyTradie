import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import {
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase, storage } from "../../firebase/config";
import RNPickerSelect from "react-native-picker-select";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import MultiSelect from "react-native-multiple-select"; // Import MultiSelect

export default function EditProfileScreen({ navigation }) {
  const [trade, setTrade] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [initialName, setInitialName] = useState(name);
  const [initialLocation, setInitialLocation] = useState(location);
  const [initialTrade, setInitialTrade] = useState(trade);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [town_city, setTownCity] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [radius, setRadius] = useState(workRadius);
  const [selectedRadiusLabel, setSelectedRadiusLabel] =
    useState("Select a Radius");
  const user = firebase.auth().currentUser;
  const [workRadius, setWorkRadius] = useState(0);

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

  const skillsByTrade = {
    Bricklayer: [
      "Laying bricks for residential and commercial buildings",
      "Constructing and repairing brick walls",
      "Building and repairing chimneys",
      "Installing and repairing brick or stone veneers",
      "Constructing and repairing retaining walls",
      "Installing decorative brickwork or stonework",
      "Building fireplaces and fire pits",
      "Repairing and maintaining brick and stone structures",
      "Installing and repairing brick or stone walkways and patios",
      "Restoring historic brick and masonry structures",
    ],
    Plumber: [
      "Installing and repairing pipes",
      "Fixing leaks and clogs",
      "Installing and repairing water heaters",
      "Inspecting plumbing systems",
      "Installing plumbing fixtures",
      "Repairing and installing sump pumps",
      "Conducting backflow testing",
      "Installing water filtration systems",
      "Installing and maintaining septic systems",
      "Performing pipe replacements",
    ],

    Electrician: [
      "Installing electrical panels",
      "Troubleshooting electrical circuits",
      "Performing electrical maintenance",
      "Wiring new construction",
      "Installing lighting fixtures",
      "Upgrading electrical systems",
      "Installing security systems",
      "Repairing electrical equipment",
      "Conducting electrical inspections",
      "Installing electric vehicle charging stations",
    ],

    Carpenter: [
      "Framing walls and roofs",
      "Installing cabinetry and countertops",
      "Repairing wooden structures",
      "Installing doors and windows",
      "Building stairs and railings",
      "Installing trim and molding",
      "Constructing decks and patios",
      "Assembling furniture",
      "Installing flooring",
      "Building custom furniture pieces",
    ],

    Painter: [
      "Interior and exterior painting",
      "Applying primers and sealers",
      "Wallpaper installation and removal",
      "Refinishing cabinetry and furniture",
      "Applying faux finishes",
      "Staining and sealing wood surfaces",
      "Painting or coating industrial structures",
      "Graffiti removal and anti-graffiti coatings",
      "Power washing surfaces before painting",
      "Applying fire-resistant coatings",
    ],
  };

  // update {workRadius} in firestore
  async function updateWorkRadius() {
    try {
      const db = firebase.firestore();
      await db.collection("users").doc(user.uid).update({
        workRadius: radius,
      });
    } catch (error) {
      console.error("Error updating workRadius: ", error);
    }
  }

  const RadiusDropdown = ({ onRadiusChange }) => {
    return (
      <View style={styles.dropdown}>
        <RNPickerSelect
          style={styles.pickerRadius}
          textInputProps={{ style: styles.pickerText }}
          onValueChange={(value) => {
            if (value !== null) {
              const selectedOption = options.find(
                (option) => option.value === value
              );
              if (selectedOption) {
                setSelectedRadiusLabel(selectedOption.label);
              }
            } else {
              setSelectedRadiusLabel("Select a Radius");
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

  async function pickDocument() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedDocument = result.assets[0];
      uploadDocument(selectedDocument.uri);
    }
  }

  React.useEffect(() => {
    setSkills(skillsByTrade[trade] || []);
  }, [trade]);

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

  // upload document to firestore
  async function uploadDocument(uri) {
    const userId = firebase.auth().currentUser.uid;
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storageRef(storage, `documents/${userId}`);
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
          saveDocumentUrlToFirestore(downloadURL);
        });
      }
    );
  }

  // save the document url to firestore
  async function saveDocumentUrlToFirestore(documentUrl) {
    const userId = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(userId).update({
      document: documentUrl,
      verified: "Pending",
    });

    alert("Document uploaded successfully");
  }

  async function saveImageUrlToFirestore(imageUrl) {
    const userId = firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(userId).update({
      profilePicture: imageUrl,
    });

    await firebase
      .firestore()
      .collection("jobs")
      .where("tradesmanId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            tradesmanProfilePicture: imageUrl,
          });
        });
      });

    await firebase
      .firestore()
      .collection("payments")
      .where("tradesmanId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            tradesmanProfilePicture: imageUrl,
          });
        });
      });

    alert("Profile picture updated successfully");
  }

  const [imageUrl, setImageUrl] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);

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

  // get the {document} from the database
  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .get();
        const userData = userDoc.data();
        setTrade(userData.trade);
        setSelectedSkills(userData.skills || []);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getUserData();
  }, []);

  React.useEffect(() => {
    setInitialName(name);
    setInitialLocation(location);
    setInitialTrade(trade);
  }, [name, location, trade]);

  // when the user clicks on the save icon, it will navigate to the HomeScreen
  const onHomeLinkPress = () => {
    navigation.navigate("Home");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

  const updateLocation = (details) => {
    const userId = firebase.auth().currentUser.uid;
    if (details && details.geometry && details.geometry.location) {
      const lat = details.geometry.location.lat;
      const lng = details.geometry.location.lng;
      if (lat && lng) {
        firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .update({
            location: new firebase.firestore.GeoPoint(lat, lng),
            town_city: details.formatted_address,
          })
          .then(() => {
            console.log("Location and town_city updated successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.error(
          "Could not retrieve latitude or longitude from Google Places API details"
        );
      }
    } else {
      console.error(
        "Could not retrieve location details from Google Places API"
      );
    }
  };

  // update the {trade} in the database
  const updateTrade = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ trade: trade })
      .then(() => {
        console.log("Name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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

  // get {workRadius} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        const fetchedWorkRadius = doc.data().workRadius;
        setWorkRadius(fetchedWorkRadius);
        const selectedOption = options.find(
          (option) => option.value === fetchedWorkRadius
        );
        if (selectedOption) {
          setSelectedRadiusLabel(selectedOption.label);
        }
      });
  }, []);

  // get the {location} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setLocation(doc.data().location);
      });
  }, []);

  // get the {trade} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTrade(doc.data().trade);
      });
  }, []);

  // get the {town_city} from the database
  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        setTownCity(doc.data().town_city);
      });
  }, []);

  // Update the {skills} in the database
  const updateSkills = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ skills: selectedSkills })
      .then(() => {
        console.log("Skills updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        const fetchedWorkRadius = doc.data().workRadius;
        setWorkRadius(fetchedWorkRadius);
        setRadius(fetchedWorkRadius); // Update the `radius` state variable with the fetched `workRadius`
        const selectedOption = options.find(
          (option) => option.value === fetchedWorkRadius
        );
        if (selectedOption) {
          setSelectedRadiusLabel(selectedOption.label);
        }
      });
  }, [workRadius]);

  // save the changes
  async function handleSave() {
    updateName(); // update the {fullName} in the database
    updateTrade(); // update the {trade} in the database
    onHomeLinkPress(); // navigate to the HomeScreen when Save is clicked
    updateSkills(); // update the {skills} in the database
    updateWorkRadius(); // update the {workRadius} in the database

    navigation.navigate("Home", { reload: true }); // reload the HomeScreen
  }

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
        <TouchableOpacity onPress={onHomeLinkPress}>
          <Icons.XMarkIcon size={30} color="#000" style={{ marginLeft: 25 }} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginLeft: Dimensions.get("window").width / 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Avenir",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 25,
          }}
        >
          <TouchableOpacity onPress={handleSave}>
            <Text
              style={{
                fontSize: Dimensions.get("window").width / 22,
                fontWeight: "bold",
                fontFamily: "Avenir",
                color: "black",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
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
            {/* Profile Picture in centre */}
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
                  source={{ uri: imageUrl }}
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

            {/* update users fullName */}
            <Text style={styles.textTopLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              placeholder="Enter new name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setName(text)}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

            {/* update users trade */}
            <Text style={styles.textLabel}>Trade</Text>
            <RNPickerSelect
              style={styles.picker}
              textInputProps={{ style: styles.pickerText }}
              onValueChange={(value) => setTrade(value)}
              items={[
                { label: "Plumber", value: "Plumber" },
                { label: "Carpenter", value: "Carpenter" },
                { label: "Electrician", value: "Electrician" },
                { label: "Painter", value: "Painter" },
                { label: "Bricklayer", value: "Bricklayer" },
              ]}
              placeholder={{ label: "Select your trade(s)", value: null }}
              containerStyle={styles.pickerContainer}
              underlineColorAndroid="transparent"
              multiple={true}
              value={trade}
            />

            <Text style={styles.textLabel}>Location</Text>
            <GooglePlacesAutocomplete
              placeholder={town_city || "Enter new location"}
              placeholderTextColor="lightgray"
              minLength={2}
              autoFocus={false}
              returnKeyType={"search"}
              listViewDisplayed="auto"
              fetchDetails={true}
              renderDescription={(row) => row.description}
              onPress={(data, details = null) => {
                updateLocation(details);
              }}
              getDefaultValue={() => search}
              query={{
                key: "AIzaSyAI1xH1dftj8RuOz42zvhhHZ45PPqHy7oU",
                language: "en",
                components: "country:ie",
              }}
              styles={{
                textInputContainer: {
                  height: screenWidth * 0.12,
                  borderColor: "lightgray",
                  overflow: "hidden",
                  backgroundColor: "white",
                  marginBottom: 10,
                  marginLeft: Dimensions.get("window").width * 0.1,
                  marginRight: Dimensions.get("window").width * 0.1,
                  fontFamily: "Avenir",
                },
                textInput: {
                  paddingLeft: 16,
                  color: "#696969",
                  placeholderTextColor: "#A0A0A0",
                  marginTop: screenWidth * 0.005,
                  fontSize: 16,
                  fontFamily: "Avenir",
                  borderBottomWidth: 0.5,
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

            <Text style={styles.textLabel}>Skills</Text>
            {skills && (
              <MultiSelect
                keyboardShouldPersistTaps="always"
                styleMainWrapper={styles.mainWrapper}
                items={skills.map((skill, index) => ({
                  id: index,
                  name: skill,
                }))}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) =>
                  setSelectedSkills(selectedItems.map((id) => skills[id]))
                }
                selectedItems={selectedSkills.map((skill) =>
                  skills.indexOf(skill)
                )}
                selectText="Choose Skills"
                searchInputPlaceholderText="Search Skills ..."
                tagRemoveIconColor="#2B2B2B"
                tagBorderColor="#F5F5F5"
                tagTextColor="#222"
                selectedItemTextColor="#222"
                selectedItemIconColor="#2B2B2B"
                fontFamily="Avenir"
                fontSize={Dimensions.get("window").width * 0.039}
                itemFontFamily="Avenir"
                itemTextColor="#000"
                styleListContainer={styles.listContainer}
                styleRowList={styles.rowList}
                displayKey="name"
                styleDropdownMenuSubsection={{
                  borderBottomColor: "#fff",
                  paddingLeft: Dimensions.get("window").width * 0.04,
                }}
                searchInputStyle={{
                  color: "#222",
                  fontFamily: "Avenir",
                  fontSize: Dimensions.get("window").width * 0.04,
                }}
                submitButtonColor="#2B2B2B"
                submitButtonText="Select"
                flatListProps={{ nestedScrollEnabled: true }}
                tagContainerStyle={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 25,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 5,
                }}
                selectedItemContainerStyle={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 25,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  margin: 5,
                }}
                searchContainerStyle={{
                  backgroundColor: "#2B2B2B",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 25,
                }}
                submitButtonStyle={{
                  backgroundColor: "#2B2B2B",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 25,
                  margin: 10,
                }}
              />
            )}

            {/* upload document */}
            <Text style={styles.textLabel}>Upload Verification Document</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: Dimensions.get("window").width * 0.35,
                marginRight: Dimensions.get("window").width * 0.35,
                //center the button in the middle of the screen
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#2B2B2B",
                  padding: Dimensions.get("window").width * 0.04,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: Dimensions.get("window").width * 0.02,
                  marginBottom: Dimensions.get("window").width * 0.02,
                }}
                onPress={pickDocument}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Avenir",
                    fontSize: Dimensions.get("window").width * 0.04,
                  }}
                >
                  Upload
                </Text>

                <Icons.CloudArrowUpIcon
                  style={{
                    //put the icon below Upload text
                    marginLeft: 10,
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.04,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Avenir",
                  fontSize: Dimensions.get("window").width * 0.04,
                }}
              >
                {documentUrl}
              </Text>
            </View>
            <Text style={styles.textLabel}>Work Radius</Text>
            <RadiusDropdown onRadiusChange={setRadius} />
          </>
        }
      />
    </SafeAreaView>
  );
}
