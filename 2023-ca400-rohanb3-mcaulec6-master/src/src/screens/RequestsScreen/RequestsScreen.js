import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";

const RequestsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("sent");
  const [requestJobs, setRequestJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  // bryan added this
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
  };

  const onPaymentPress = () => {
    navigation.navigate("ConfirmPayment");
  };

  const onRequestPress = () => {
    navigation.navigate("RequestJob");
  };

  const onSearchPress = () => {
    navigation.navigate("CustomerHome");
  };

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

  useEffect(() => {
    const jobRequestQuery = firebase
      .firestore()
      .collection("jobs")
      .where("customerId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "Requested")
      .orderBy("createdAt", "desc");

    const jobCurrentQuery = firebase
      .firestore()
      .collection("jobs")
      .where("customerId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "accepted")
      .orderBy("createdAt", "desc");

    const jobPreviousQuery = firebase
      .firestore()
      .collection("jobs")
      .where("customerId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "completed")
      .orderBy("createdAt", "desc");

    const unsubscribeRequest = jobRequestQuery.onSnapshot((snapshot) => {
      const jobRequestData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequestJobs(jobRequestData);
    });

    const unsubscribeCurrent = jobCurrentQuery.onSnapshot((snapshot) => {
      const jobCurrentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCurrentJobs(jobCurrentData);
    });

    const unsubscribePrevious = jobPreviousQuery.onSnapshot((snapshot) => {
      const jobPreviousData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPreviousJobs(jobPreviousData);
    });

    return () => {
      unsubscribeRequest();
      unsubscribeCurrent();
      unsubscribePrevious();
    };
  }, [firebase.auth().currentUser.uid]);


  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
        backgroundColor="#fff"
      >
        {/* // Profile Picture directs user to ProfileScreen */}
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
          <View
            style={{
              marginLeft: Dimensions.get("window").width * 0.15,
            }}
          ></View>

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

        <View>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "sent" && styles.activeTab]}
              onPress={() => handleTabPress("sent")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "sent" && styles.activeTabText,
                ]}
              >
                Sent Requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "current" && styles.activeTab]}
              onPress={() => handleTabPress("current")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "current" && styles.activeTabText,
                ]}
              >
                Current Jobs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "previous" && styles.activeTab]}
              onPress={() => handleTabPress("previous")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "previous" && styles.activeTabText,
                ]}
              >
                Previous Jobs
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "sent" ? (
            // Sent Requests Tab
            <View>
              <FlatList
                data={requestJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TradePage", { id: item.tradesmanId })
                    }
                  >
                    <View style={styles.listItem}>
                      <Image
                        source={
                          item.tradesmanProfilePicture
                            ? { uri: item.tradesmanProfilePicture }
                            : require("../../../assets/null2.jpeg")
                        }
                        style={styles.avatar}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.tradesmanName}</Text>
                        <Text style={styles.occupation}>
                          {item.tradesmanTrade}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Icons.ClockIcon
                          size={18}
                          color="orange"
                          style={{
                            marginTop: Dimensions.get("window").height * 0.001,
                          }}
                        />
                        <Text style={styles.status}>{item.status}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                        textAlign: "center",
                        marginTop: "10%",
                        color: "gray",
                      }}
                    >
                      No Sent Requests
                    </Text>
                    <Icons.ExclamationCircleIcon
                      size={Dimensions.get("window").height * 0.038}
                      color="gray"
                      style={{
                        alignSelf: "center",
                        marginTop: Dimensions.get("window").height * 0.03,
                      }}
                    />
                  </View>
                }
              />
            </View>
          ) : // End of Sent Requests Tab

            activeTab === "current" ? (
              // Render Sent Requests component
              <View>
                {/* Current Jobs Start */}
                <FlatList
                  data={currentJobs}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("TradePage", { id: item.tradesmanId })
                      }
                    >
                      <View style={styles.listItem}>
                        <Image
                          source={
                            item.tradesmanProfilePicture
                              ? { uri: item.tradesmanProfilePicture }
                              : require("../../../assets/null2.jpeg")
                          }
                          style={styles.avatar}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{item.tradesmanName}</Text>
                          <Text style={styles.occupation}>
                            {item.tradesmanTrade}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <Icons.EllipsisHorizontalCircleIcon
                            size={18}
                            color="#0E86D4"
                            style={{
                              marginTop: Dimensions.get("window").height * 0.001,
                            }}
                          />
                          <Text style={styles.status}>In Progress</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          fontFamily: "Avenir",
                          textAlign: "center",
                          marginTop: "10%",
                          color: "gray",
                        }}
                      >
                        No Jobs In Progress
                      </Text>
                      <Icons.ExclamationCircleIcon
                        size={Dimensions.get("window").height * 0.038}
                        color="gray"
                        style={{
                          alignSelf: "center",
                          marginTop: Dimensions.get("window").height * 0.03,
                        }}
                      />
                    </View>
                  }
                />
              </View>
            ) : (
              // Current Jobs End
              // Render Previous Jobs component
              <View>
                <FlatList
                  data={previousJobs}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("TradePage", { id: item.tradesmanId })
                      }
                    >
                      <View style={styles.listItem}>
                        <Image
                          source={
                            item.tradesmanProfilePicture
                              ? { uri: item.tradesmanProfilePicture }
                              : require("../../../assets/null2.jpeg")
                          }
                          style={styles.avatar}
                        />
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{item.tradesmanName}</Text>
                          <Text style={styles.occupation}>
                            {item.tradesmanTrade}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <Icons.CheckCircleIcon
                            size={18}
                            color="green"
                            style={{
                              marginTop: Dimensions.get("window").height * 0.001,
                            }}
                          />
                          <Text style={styles.status}>Completed</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          fontFamily: "Avenir",
                          textAlign: "center",
                          marginTop: "10%",
                          color: "gray",
                        }}
                      >
                        No Previous Jobs
                      </Text>
                      <Icons.ExclamationCircleIcon
                        size={Dimensions.get("window").height * 0.038}
                        color="gray"
                        style={{
                          alignSelf: "center",
                          marginTop: Dimensions.get("window").height * 0.03,
                        }}
                      />
                    </View>
                  }
                />
              </View>
            )}
        </View>
      </SafeAreaView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton} onPress={onSearchPress}>
          <Icons.MagnifyingGlassIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onRequestPress}>
          <Icons.BriefcaseIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Jobs</Text>
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
};

export default RequestsScreen;
