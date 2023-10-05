import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";

export default function PaymentMethodScreen({ route, navigation }) {
  const { selectedClient, customerId, value, jobId } = route.params;
  const [selected, setSelected] = useState(null);
  const [payment_method, setPaymentMethod] = useState(null);

  const handlePress = (index, item) => {
    setSelected(index);
    setPaymentMethod(item);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onChargePress = () => {
    navigation.navigate("PaymentConfirmation");
  };

  const onHomePress = () => {
    navigation.navigate("Home");
  };

  const onPaymentPress = () => {
    navigation.navigate("Payment");
  };

  const onJobsPress = () => {
    navigation.navigate("AnalyticsTrade");
  };

  const handleCharge = async () => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(userId);
    const userDoc = await userRef.get();
    const customerRef = firebase
      .firestore()
      .collection("users")
      .doc(customerId);
    const customerDoc = await customerRef.get();
    const paymentData = {
      tradieId: userId,
      tradieName: userDoc.data().fullName,
      customerName: selectedClient,
      customerId: customerId,
      method: payment_method,
      value: value,
      status: "pending",
      //store the jobId from jobs collection in the payments collection
      jobId: jobId,
      tradieProfilePicture: userDoc.data().profilePicture || null,
      customerProfilePicture: customerDoc.data().profilePicture || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await firebase.firestore().collection("payments").add(paymentData); // create a new payment document in Firestore
    console.log("Payment reference created!");
    onChargePress();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onPaymentPress}>
            <Icons.ArrowLeftIcon
              style={{
                marginBottom: Dimensions.get("window").height * 0.02,
                marginLeft: 30,
                marginTop: Dimensions.get("window").height * 0.04,
              }}
              color="#2B2B2B"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Method</Text>
        </View>

        <View style={styles.squareContainer}>
          {[
            {
              icon: (
                <IconsOutline.CurrencyEuroIcon
                  style={styles.squareIcon}
                  color="black"
                  size={30}
                />
              ),
              label: "Cash",
            },
            {
              icon: (
                <IconsOutline.BuildingLibraryIcon
                  style={styles.squareIcon}
                  color="black"
                  size={30}
                />
              ),
              label: "Bank Transfer",
            },
            {
              icon: (
                <IconsOutline.CreditCardIcon
                  style={styles.squareIcon}
                  color="black"
                  size={30}
                />
              ),
              label: "Credit Card",
            },
            {
              icon: (
                <Image
                  style={styles.payPal}
                  source={require("../../../assets/paypal.png")}
                />
              ),
              label: "PayPal",
            },
            {
              icon: (
                <Image
                  style={styles.revolut}
                  source={require("../../../assets/revolut.png")}
                />
              ),
              label: "Revolut",
            },
            {
              icon: (
                <IconsOutline.CommandLineIcon
                  style={styles.squareIcon}
                  color="black"
                  size={30}
                />
              ),
              label: "Cheque",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.square,
                { borderColor: selected === index ? "lightgray" : "lightgray" },
                { borderWidth: selected === index ? 2 : 0 },
              ]}
              onPress={() => handlePress(index, item.label)}
            >
              {item.icon}
              <Text style={styles.squareTextBox}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            selected === null && { backgroundColor: "#E1E0E0" },
          ]}
          onPress={selected === null ? () => {} : handleCharge}
          disabled={selected === null}
        >
          <Text style={styles.buttonTitle}>CHARGE</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton} onPress={onHomePress}>
          <IconsOutline.HomeIcon style={styles.tabButtonIcon} color="gray" />
          <Text style={styles.tabButtonDisabledText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <Icons.CreditCardIcon style={styles.tabButtonIcon} color="#2B2B2B" />
          <Text style={styles.tabButtonText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onJobsPress}>
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
