import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

export default function PaymentScreen({ navigation, route }) {
  const client = route?.params || null;
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { width } = Dimensions.get("window");
  const EUR_WIDTH = width * 0.2; // You can adjust this percentage to your liking
  const jobsRef = firebase.firestore().collection("jobs");
  const paymentsRef = firebase.firestore().collection("payments");
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);
  const screenHeight = Dimensions.get("window").height;
  const clientName = client ? client : selectedClient;
  const [activeTab, setActiveTab] = useState("createReference");

  useEffect(() => {
    // Retrieve the list of customers from the "jobs" collection
    const unsubscribe = jobsRef
      .where("tradesmanId", "==", firebase.auth().currentUser.uid)
      .where("status", "==", "accepted")
      .onSnapshot((querySnapshot) => {
        const customers = [];
        querySnapshot.forEach((doc) => {
          const customer = doc.data();
          customer.id = doc.id;
          customers.push(customer);
        });
        setCustomers(customers);
      });

    const unsubscribePaymentHistory = paymentsRef
      .where("tradieId", "==", firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const payments = [];
        querySnapshot.forEach((doc) => {
          const payment = doc.data();
          payment.id = doc.id;
          payments.push(payment);
        });
        setPayments(payments);
      });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => {
      unsubscribe();
      unsubscribePaymentHistory();
    };
  }, []);

  const handleInputChange = (text) => {
    // remove non-digits
    let newText = text.replace(/[^\d]/g, "");

    // remove leading zeros
    newText = newText.replace(/^0+/, "");

    // pad with leading zero if there is no integer part
    if (newText === "") {
      newText = "0";
    }

    // insert decimal point
    if (newText.length > 2) {
      newText = newText.slice(0, -2) + "." + newText.slice(-2);
    } else {
      newText = "0." + newText.padStart(2, "0");
    }

    setValue(newText);
  };

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
  };

  const handleSelectClient = () => {
    setModalVisible(true);
  };
  const handleClient = (customer) => {
    setSelectedClient(customer);
    setModalVisible(false);
  };

  const onAnalyticsPress = () => {
    navigation.navigate("AnalyticsTrade");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onHomePress = () => {
    navigation.navigate("Home");
  };

  const onPaymentPress = () => {
    navigation.navigate("Payment");
  };

  const onPaymentMethodPress = () => {
    console.log("clientName: ", clientName.customerName);
    navigation.navigate("PaymentMethod", {
      selectedClient: clientName.customerName,
      customerId: clientName.customerId,
      value,
      jobId: clientName.jobId,
    });
  };

  const onBackPress = () => {
    navigation.navigate("Home");
  };

  // get profilePicture from firebase database
  const [profilePicture, setProfilePicture] = useState(null);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

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
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                fontFamily: "Avenir",
                marginLeft: Dimensions.get("window").width * 0.1,
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
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "createReference" && styles.activeTab,
            ]}
            onPress={() => handleTabPress("createReference")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "createReference" && styles.activeTabText,
              ]}
            >
              Payment Reference
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "paymentHistory" && styles.activeTab,
            ]}
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

        <View style={{ flexDirection: "row", alignItems: "center" }}>
        </View>
        {activeTab === "createReference" && (
          <View>
            <TextInput
              style={[styles.input2, isFocused && styles.focused2]}
              placeholder="0.00"
              value={value}
              onChangeText={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="decimal-pad"
              textAlign="center"
              writingDirection="rtl"
              underlineColorAndroid="transparent"
              caretHidden={true}
            />
            <Text style={[styles.EUR, { width: EUR_WIDTH }]}>EUR</Text>

            <TouchableOpacity
              style={styles.selectClient}
              onPress={handleSelectClient}
            >
              <Icons.UserCircleIcon size={30} style={styles.selectClientIcon} />
              <Text style={styles.selectClientTitle}>
                {clientName ? clientName.customerName : "Select a Client"}
              </Text>
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
                <FlatList
                  data={customers}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.tradeItem}
                      onPress={() => handleClient(item)}
                    >
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "lightgray",
                          marginLeft: 50,
                          marginRight: 30,
                          flexDirection: "row",
                          alignItems: "center", // align arrow with text vertically
                        }}
                      >
                        <Icons.UserCircleIcon
                          style={{
                            marginLeft: Dimensions.get("window").width * 0.05,
                            color: "#A0A0A0",
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: 20,
                            fontSize: 16,
                            padding: 10,
                            marginRight: 30,
                            borderBottomWidth: 1,
                            borderBottomColor: "lightgray",
                            borderColor: "lightgray",
                            color: "black",
                            marginBottom: 5,
                            marginTop: 10,
                            flex: 1, // allow text to take up remaining space
                            fontFamily: "Avenir",
                          }}
                        >
                          {item.customerName}
                        </Text>
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
                        You Have No Current Clients
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
            </Modal>

            <TouchableOpacity
              style={[
                styles.button,
                (value === "" || !clientName) && { backgroundColor: "#E1E0E0" },
              ]}
              onPress={
                value === "" || !clientName ? () => {} : onPaymentMethodPress
              }
              disabled={value === "" ?? !clientName}
            >
              <Text style={styles.buttonTitle}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        )}
        {activeTab === "paymentHistory" && (
          //display list of payments
          <View>
            <FlatList
              data={payments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
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
                      Paid via {item.method}
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
          <IconsOutline.HomeIcon style={styles.tabButtonIcon} color="gray" />
          <Text style={styles.tabButtonDisabledText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <Icons.CreditCardIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Payment</Text>
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
