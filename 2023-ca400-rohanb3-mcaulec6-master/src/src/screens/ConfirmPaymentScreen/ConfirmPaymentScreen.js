import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import { Rating } from "react-native-ratings";

const ConfirmPaymentScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTwoVisible, setModalTwoVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);
  const [payment, setPayment] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmReference");
  const [payments, setPayments] = useState([]);

  const onPaymentPress = () => {
    navigation.navigate("ConfirmPayment");
  };

  const onRequestPress = () => {
    navigation.navigate("RequestJob");
  };

  const onHomePress = () => {
    navigation.navigate("CustomerHome");
  };

  const onProfileImagePress = () => {
    navigation.navigate("CustSetting");
  };

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const jobQuery = firebase
      .firestore()
      .collection("payments")
      .where("customerId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "pending")
      .orderBy("createdAt", "desc");

    const paymentQuery = firebase
      .firestore()
      .collection("payments")
      .where("customerId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc");

    const unsubscribe = jobQuery.onSnapshot((snapshot) => {
      const jobData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobData);
    });

    const unsubscribeTwo = paymentQuery.onSnapshot((snapshot) => {
      const paymentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(paymentData);
    });

    return () => {
      unsubscribe();
      unsubscribeTwo();
    };
  }, [firebase.auth().currentUser.uid]);

  const handleJobResponse = async (paymentId, response, jobId) => {
    await firebase.firestore().collection("payments").doc(paymentId).update({
      status: response,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    if (response === "approved") {
      //update job status to completed in the jobs collection
      await firebase.firestore().collection("jobs").doc(jobId).update({
        status: "completed",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log("Payment", paymentId, "is now", response);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSubmitReview = async () => {
    // Submit the review
    console.log("Submitted review:", reviewText, "with rating:", rating);
    const userId = firebase.auth().currentUser.uid; // get the current user ID
    const userRef = firebase.firestore().collection("users").doc(userId); // assuming user data is stored in a 'users' collection
    const userDoc = await userRef.get(); // get the user document from Firestore
    const userName = userDoc.data().fullName;
    const reviewData = {
      customerId: userId,
      customerName: userName,
      tradesmanId: payment.tradieId,
      tradesmanName: payment.tradieName,
      jobId: payment.jobId,
      review: reviewText,
      rating: rating,
      customerProfilePicture: userDoc.data().profilePicture || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await firebase.firestore().collection("reviews").add(reviewData); // create a new review document in Firestore
    console.log("Review Created!");

    // Update the tradies average rating in the users collection
    const tradieRef = firebase
      .firestore()
      .collection("users")
      .doc(payment.tradieId);
    const tradieDoc = await tradieRef.get();
    //if tradie rating is NaN, set rating to 0
    if (isNaN(tradieDoc.data().rating)) {
      await tradieRef.update({
        rating: 0,
        ratingCount: 0,
      });
      console.log("Tradie rating updated! Rating:", 0, "Rating Count:", 0);
    }

    const tradieRating = tradieDoc.data().rating;
    //go through all the reviews for the tradie and calculate the average rating
    const reviewsQuery = firebase
      .firestore()
      .collection("reviews")
      .where("tradesmanId", "==", payment.tradieId);
    const reviews = await reviewsQuery.get();
    const reviewsList = reviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Review Data:", reviewsList);
    let totalRating = 0;
    let totalRatingCount = 0;
    reviewsList.forEach((review) => {
      totalRating += review.rating;
      totalRatingCount += 1;
    });
    //round the rating to 1 decimal place
    const newRating = Math.round((totalRating / totalRatingCount) * 10) / 10;
    console.log("New Rating:", newRating);
    await tradieRef.update({
      rating: newRating,
      ratingCount: totalRatingCount,
    });
    console.log(
      "Tradie rating updated! Rating:",
      newRating,
      "Rating Count:",
      totalRatingCount
    );
    // Close the modal and reset the review text and rating
    setModalTwoVisible(false);
    setReviewText("");
    setRating(0);
  };

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
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: Dimensions.get("window").width * 0.06,
                fontWeight: "bold",
                fontFamily: "Avenir",
                marginLeft: Dimensions.get("window").width * 0.15,
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
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "confirmReference" && styles.activeTab]}
            onPress={() => handleTabPress("confirmReference")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "confirmReference" && styles.activeTabText,
              ]}
            >
              Confirm Reference
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "paymentHistory" && styles.activeTab]}
            onPress={() => handleTabPress("paymentHistory")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "paymentHistory" && styles.activeTabText,
              ]}
            >
              Payment History
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "confirmReference" && (
          <View>
            {/*Modal one*/}
            <Modal visible={modalVisible} transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {accept ? (
                    <Text style={styles.acceptOrDecline}>
                      Confirm {payment.tradieName}'s payment reference ?
                    </Text>
                  ) : (
                    <Text style={styles.acceptOrDecline}>
                      Decline {payment.tradieName}'s payment reference ?
                    </Text>
                  )}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => {
                        setModalVisible(false);
                        setModalTwoVisible(accept);
                        setAccept(false);
                        setDecline(false);
                        handleJobResponse(payment.id, "approved", payment.jobId);
                      }}
                    >
                      <Text style={styles.acceptButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.declineButton}
                      onPress={() => {
                        setModalVisible(false);
                        setAccept(false);
                        setDecline(false);
                      }}
                    >
                      <Text style={styles.declineButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <FlatList
              data={jobs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { }}>
                  <View style={styles.listItem}>
                    <Image
                      source={
                        item.tradieProfilePicture
                          ? { uri: item.tradieProfilePicture }
                          : require("../../../assets/null2.jpeg")
                      }
                      style={styles.avatar}
                    />
                    <View style={styles.infoContainer}>
                      <Text style={styles.name}>{item.tradieName}</Text>
                      <Text style={styles.occupation}>
                        €{item.value} via {item.method}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => {
                          setModalVisible(true);
                          setAccept(true);
                          setDecline(false);
                          setPayment(item);
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Icons.CheckCircleIcon
                            size={Dimensions.get("window").height * 0.038}
                            color="#2B2B2B"
                            style={
                              {
                                // marginTop: Dimensions.get("window").height * 0.01,
                              }
                            }
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Avenir",
                              marginTop: Dimensions.get("window").height * 0.001,
                            }}
                          >
                            Accept
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setDecline(true);
                          setAccept(false);
                          setPayment(item);
                        }}
                      >
                        <View style={{ alignItems: "center" }}>
                          <IconsOutline.XCircleIcon
                            size={Dimensions.get("window").height * 0.038}
                            color="#2B2B2B"
                            style={
                              {
                                // marginTop: Dimensions.get("window").height * 0.01,
                              }
                            }
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Avenir",
                              marginTop: Dimensions.get("window").height * 0.001,
                            }}
                          >
                            Decline
                          </Text>
                        </View>
                      </TouchableOpacity>
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
                    No Pending Payments
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

            {/*Modal two*/}
            <Modal
              visible={modalTwoVisible}
              transparent={true}
            >
              <View style={styles.modalContainer2}>
                <View style={styles.modalContent2}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={30}
                    onFinishRating={(value) => setRating(value)}
                    style={styles.starRatingContainer2}
                    showRating={true}
                    ratingColor="green"
                  />
                  <Text style={styles.modalTitle2}>Write A Review</Text>

                  <TextInput
                    style={styles.reviewInput2}
                    placeholder="Enter Your Review..."
                    multiline
                    value={reviewText}
                    onChangeText={setReviewText}
                  />

                  <View
                    style={{
                      flexDirection: "row-reverse",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.submitButton2}
                      onPress={handleSubmitReview}
                    >
                      <Text style={styles.submitButtonText2}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.closeButton2}
                      onPress={() => setModalTwoVisible(false)}
                    >
                      <Text style={styles.closeButtonText2}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
        {activeTab === "paymentHistory" && (
          <View>
            <FlatList
              data={payments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tradeItem}

                >
                  <View style={styles.listItem}>
                    <Image
                      source={
                        item.tradieProfilePicture
                          ? { uri: item.tradieProfilePicture }
                          : require("../../../assets/null2.jpeg")
                      }
                      style={styles.avatar}
                    />
                    <View style={styles.infoContainer}>
                      <Text style={styles.name}>{item.tradieName}</Text>
                      <Text style={styles.occupation}>
                        Paid Via {item.method}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.money}>€{item.value}</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View>
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").height * 0.02,
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                      textAlign: "center",
                      marginTop: "10%",
                      color: "gray",
                    }}
                  >
                    You Have No Payment History
                  </Text>
                  <Icons.ExclamationCircleIcon
                    size={Dimensions.get("window").height * 0.03}
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


      </SafeAreaView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton} onPress={onHomePress}>
          <Icons.MagnifyingGlassIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onRequestPress}>
          <IconsOutline.BriefcaseIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <Icons.CreditCardIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPaymentScreen;
