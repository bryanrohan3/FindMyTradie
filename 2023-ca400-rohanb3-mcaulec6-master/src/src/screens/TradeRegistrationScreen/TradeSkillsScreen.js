import React, { useLayoutEffect, useState, useEffect } from "react";
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
import MultiSelect from "react-native-multiple-select"; // Import MultiSelect

export default function TradeSkillsScreen({ navigation, route }) {
  const trade = route.params.trade; // Extract trade from route.params

  // Define skills for each trade
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

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    setIsInputValid(selectedSkills.length > 0);
  }, [selectedSkills]);

  // Set skills based on selected trade
  useEffect(() => {
    if (trade) {
      setSkills(skillsByTrade[trade]);
    }
  }, [trade]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const userId = firebase.auth().currentUser.uid;

  const updateSkillsInDatabase = async (skills) => {
    const userDocRef = firebase.firestore().collection("users").doc(userId);

    try {
      await userDocRef.update({
        skills: skills,
      });
      console.log("Skills updated successfully.");
    } catch (error) {
      console.error("Error updating skills: ", error);
    }
  };

  const onBackArrowPress = () => {
    navigation.navigate("SelectTrade");
  };

  const onContinuePress = () => {
    // Handle selected skills and navigate
    console.log("Selected Skills:", selectedSkills);
    updateSkillsInDatabase(selectedSkills);
    navigation.navigate("TradeClientQuestion");
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
            progress={0.375}
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

            {/* about you */}
            <View>
              <Text style={styles.titleAboutYou}>Pick your Skills</Text>
              <Text style={styles.textSetUp2}>
                Select from the list of skills below
              </Text>

              {/* Render MultiSelect dropdown */}
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
          </>
        }
      />
    </SafeAreaView>
  );
}
