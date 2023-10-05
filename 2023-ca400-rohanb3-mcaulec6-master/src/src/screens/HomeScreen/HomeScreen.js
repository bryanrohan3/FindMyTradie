// HomeScreen.js
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import Modal from "react-native-modal";

export default function HomeScreen({ navigation }) {
  const [circleColor, setCircleColor] = useState("transparent");
  const [verified, setVerified] = useState(false);
  const [job, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("requests");
  const [requestJobs, setRequestJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    const jobRequestQuery = firebase
      .firestore()
      .collection("jobs")
      .where("tradesmanId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "Requested")
      .orderBy("createdAt", "desc");

    const jobCurrentQuery = firebase
      .firestore()
      .collection("jobs")
      .where("tradesmanId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "accepted")
      .orderBy("createdAt", "desc");

    const jobPreviousQuery = firebase
      .firestore()
      .collection("jobs")
      .where("tradesmanId", "==", firebase.auth().currentUser.uid)
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

    // payments
    const paymentsQuery = firebase
      .firestore()
      .collection("payments")
      .where("tradieId", "==", firebase.auth().currentUser.uid);

    const unsubscribePayments = paymentsQuery.onSnapshot((snapshot) => {
      const paymentsDataFromDb = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaymentsData(paymentsDataFromDb);
    });

    // end of data payments

    return () => {
      unsubscribeRequest();
      unsubscribeCurrent();
      unsubscribePrevious();
      unsubscribePayments();
    };
  }, [firebase.auth().currentUser.uid]);


  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

  // get profilePicture from firebase database
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

  // when the page refreshes the user is still logged in
  // so we need to check if the user is logged in
  // if they are, we need to navigate them to the home screen
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, []);

  // when the user clicks on the image icon, it will navigate to the ProfileScreen
  const onProfileImagePress = () => {
    navigation.toggleDrawer();
  };

  const onPaymentPress = () => {
    navigation.navigate("Payment");
  };

  const onAnalyticsPress = () => {
    navigation.navigate("AnalyticsTrade");
  };

  const handleJobResponse = async (jobId, response) => {
    await firebase.firestore().collection("jobs").doc(jobId).update({
      status: response,
      jobId: jobId,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const onJobFinishPress = (item) => {
    navigation.navigate("Payment", item);
  };

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
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

          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
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
              marginRight: Dimensions.get("window").width * 0.05,
            }}
          >
            <TouchableOpacity onPress={onSettingsPress}>
              <IconsOutline.Cog6ToothIcon size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "requests" && styles.activeTab]}
              onPress={() => handleTabPress("requests")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "requests" && styles.activeTabText,
                ]}
              >
                Requested
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

          {activeTab === "requests" ? (
            // Sent Requests Tab
            <View>
              <Modal
                // animationType="slide"
                visible={modalVisible}
                transparent={true}
                style={{ margin: 0 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Icons.XCircleIcon
                        color="black"
                        size={Dimensions.get("window").width * 0.065}
                      />
                    </TouchableOpacity>
                    <Text style={styles.acceptOrDecline}>
                      Do you want to accept or decline this job?
                    </Text>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => {
                          setModalVisible(false);
                          handleJobResponse(job, "accepted");
                        }}
                      >
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={() => {
                          setModalVisible(false);
                          handleJobResponse(job, "declined");
                        }}
                      >
                        <Text style={styles.declineButtonText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <FlatList
                data={requestJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setJobs(item.id);
                    }}
                  >
                    <View style={styles.listItem}>
                      <Image
                        source={
                          item.customerProfilePicture
                            ? { uri: item.customerProfilePicture }
                            : require("../../../assets/null2.jpeg")
                        }
                        style={styles.avatar}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.customerName}</Text>
                        <Text style={styles.occupation}>
                          Request Recieved:{" "}
                          {item.createdAt &&
                            item.createdAt.toDate().toLocaleDateString("en-GB")}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Icons.ClockIcon
                          size={15}
                          color="orange"
                          style={{
                            marginTop: Dimensions.get("window").height * 0.016,
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
                      No Requested Jobs
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
          ) : // End of Requested Requests Tab

          activeTab === "current" ? (
            // Render Sent Requests component
            <View>
              <Modal
                visible={modalVisible}
                transparent={true}
                style={{ margin: 0 }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Icons.XCircleIcon
                        color="#2B2B2B"
                        size={Dimensions.get("window").width * 0.065}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        setModalVisible(false);
                        onJobFinishPress(job);
                      }}
                    >
                      <Text style={styles.actionButtonText}>
                        Finish Job & Record Payment
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.or}>or</Text>
                    <TouchableOpacity
                      style={styles.actionButton2}
                      onPress={() => {
                        setModalVisible(false);
                        handleJobResponse(job.jobId, "completed");
                      }}
                    >
                      <Text style={styles.actionButtonText2}>Finish Job</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <FlatList
                data={currentJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setJobs(item);
                    }}
                  >
                    <View style={styles.listItem}>
                      <Image
                        source={
                          item.customerProfilePicture
                            ? { uri: item.customerProfilePicture }
                            : require("../../../assets/null2.jpeg")
                        }
                        style={styles.avatar}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.customerName}</Text>
                        <Text style={styles.occupation}>
                          Date Accepted:{" "}
                          {item.updatedAt &&
                            item.updatedAt.toDate().toLocaleDateString("en-GB")}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Icons.EllipsisHorizontalCircleIcon
                          size={15}
                          color="#0E86D4"
                          style={{
                            marginTop: Dimensions.get("window").height * 0.016,
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
            // Render Previous Jobs component
            <View>
              <FlatList
                data={previousJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  // <TouchableOpacity>
                  <View style={styles.listItem}>
                    <Image
                      source={
                        item.customerProfilePicture
                          ? { uri: item.customerProfilePicture }
                          : require("../../../assets/null2.jpeg")
                      }
                      style={styles.avatar}
                    />
                    <View style={styles.infoContainer}>
                      <Text style={styles.name}>{item.customerName}</Text>

                      {/* if paymentData for this customer in the list is not existant print "No Payment" else print the payment method and value inside the list item*/}

                      {/* <Text style={styles.occupation}>{item.jobId}</Text> */}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Icons.CheckCircleIcon
                        size={15}
                        color="green"
                        style={{
                          marginTop: Dimensions.get("window").height * 0.016,
                        }}
                      />
                      <Text style={styles.status}>Finished</Text>
                    </View>
                  </View>
                  // </TouchableOpacity>
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
        <TouchableOpacity style={styles.tabButton}>
          <Icons.HomeIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <IconsOutline.CreditCardIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onAnalyticsPress}>
          <IconsOutline.ChartBarIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
