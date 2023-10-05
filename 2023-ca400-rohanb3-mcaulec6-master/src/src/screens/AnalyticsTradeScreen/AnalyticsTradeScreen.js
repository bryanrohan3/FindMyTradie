import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import * as Icons from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";

export default function AnalyticsTradeScreen({ navigation }) {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [uniqueClients, setUniqueClients] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [acceptedJobs, setAcceptedJobs] = useState(0);
  const [requestedJobs, setRequestedJobs] = useState(0);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const jobsRef = firebase.firestore().collection("jobs");

    const fetchJobCounts = async () => {
      const snapshot = await jobsRef.where("tradesmanId", "==", userId).get();
      let completed = 0;
      let accepted = 0;
      let requested = 0;
      const uniqueClients = new Set();

      snapshot.forEach((doc) => {
        const status = doc.data().status;
        const customerId = doc.data().customerId;
        uniqueClients.add(customerId);

        if (status === "completed") {
          completed++;
        } else if (status === "accepted") {
          accepted++;
        } else if (status === "Requested") {
          requested++;
        }
      });

      setCompletedJobs(completed);
      setAcceptedJobs(accepted);
      setRequestedJobs(requested);
      setUniqueClients(uniqueClients.size);
    };

    fetchJobCounts();

    const unsubscribe = jobsRef
      .where("tradesmanId", "==", userId)
      .onSnapshot(() => {
        fetchJobCounts();
      });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const paymentsRef = firebase.firestore().collection("payments");

    const unsubscribe = paymentsRef
      .where("tradieId", "==", userId)
      .onSnapshot((querySnapshot) => {
        let earnings = 0;
        querySnapshot.forEach((doc) => {
          earnings += parseFloat(doc.data().value);
        });
        setTotalEarnings(earnings.toFixed(2));
      });

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getCurrentMonth = () => {
    const currentDate = new Date();
    return moment(currentDate).format("MMM");
  };

  const generateMonths = () => {
    const currentMonth = getCurrentMonth();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      months.push(moment().subtract(i, "months").format("MMM"));
    }
    return months;
  };

  const [jobCountsPerMonth, setJobCountsPerMonth] = useState(
    generateMonths().reduce((months, month) => {
      months[month] = 0;
      return months;
    }, {})
  );

  React.useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const jobsRef = firebase.firestore().collection("jobs");

    const fetchJobCounts = async () => {
      const snapshot = await jobsRef.where("tradesmanId", "==", userId).get();
      let jobCounts = { ...jobCountsPerMonth }; // Initialize job counts with zeroes

      snapshot.forEach((doc) => {
        const date = doc.data().createdAt.toDate();
        const month = moment(date).format("MMM");

        if (jobCounts[month] !== undefined) {
          jobCounts[month]++;
        }
      });

      setJobCountsPerMonth(jobCounts);
    };

    fetchJobCounts();

    const unsubscribe = jobsRef
      .where("tradesmanId", "==", userId)
      .onSnapshot(() => {
        fetchJobCounts();
      });

    return () => unsubscribe();
  }, []);

  // when the user clicks on the image icon, it will navigate to the ProfileScreen
  const onProfileImagePress = () => {
    navigation.toggleDrawer();
  };

  const onPaymentPress = () => {
    navigation.navigate("Payment");
  };

  const onHomePress = () => {
    navigation.navigate("HomeScreen");
  };

  const onSettingsPress = () => {
    navigation.navigate("CustSetting");
  };

  const formatYLabel = (label) => {
    const labelValue = Math.round(label * yAxisInterval);
    return labelValue.toString();
  };

  const maxJobs = Math.max(...Object.values(jobCountsPerMonth));

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

        <ScrollView style={styles.scrollView}>
          {/* Analytic Data Start */}
          <View style={styles.totalEarnings}>
            <Text style={styles.totalEarningsText}>Total Earnings</Text>
            <Text
              style={{
                fontSize: Dimensions.get("window").width * 0.08,
                fontWeight: "bold",
              }}
            >
              €{totalEarnings}
            </Text>
          </View>

          <Text style={styles.jobCountHeading}>Jobs</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <View style={styles.statusColumn}>
                <Text style={styles.statusTitle}>Completed</Text>
                <Text style={styles.statusValue}>{completedJobs}</Text>
              </View>
              <View style={styles.statusColumn}>
                <Text style={styles.statusTitle}>Current</Text>
                <Text style={styles.statusValue}>{acceptedJobs}</Text>
              </View>
              <View style={styles.statusColumn}>
                <Text style={styles.statusTitle}>Requested</Text>
                <Text style={styles.statusValue}>{requestedJobs}</Text>
              </View>
            </View>
          </View>

          {/* Job Counts End */}

          <View style={{ marginTop: 20 }}>
            <Text style={styles.jobCountHeading}>Clients</Text>

            <Text style={styles.clientValue}>{uniqueClients}</Text>
          </View>

          <View>
            <Text style={styles.jobCountHeading}>Jobs per Month</Text>
            <LineChart
              data={{
                labels: Object.keys(jobCountsPerMonth),
                datasets: [
                  {
                    data: Object.values(jobCountsPerMonth),
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                style: {
                  borderRadius: 16,
                },
                yAxisLabel: "",
                yAxisInterval: Math.ceil(maxJobs / 12), // Updated yAxisInterval calculation
                formatYLabel: formatYLabel,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withInnerLines={false}
              withOuterLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              withDots={true}
              yAxisSuffix=" " // Add space as yAxisSuffix to show yAxisLabel
            />
          </View>
        </ScrollView>

        {/* Analytic Data End */}
      </SafeAreaView>
      <View style={styles.containerNav}>
        <TouchableOpacity style={styles.tabButton} onPress={onHomePress}>
          <IconsOutline.HomeIcon style={styles.tabButtonIcon} color="gray" />
          <Text style={styles.tabButtonDisabledText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={onPaymentPress}>
          <IconsOutline.CreditCardIcon
            style={styles.tabButtonIcon}
            color="gray"
          />
          <Text style={styles.tabButtonDisabledText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton}>
          <Icons.ChartBarIcon style={styles.tabButtonIcon} color="black" />
          <Text style={styles.tabButtonText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
