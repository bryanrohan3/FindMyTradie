import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  AccountTypeScreen,
  TradeRegistrationScreen,
  EditProfileScreen,
  TradeProfileScreen,
  PaymentScreen,
  PaymentMethodScreen,
  StartSetUpScreen,
  TradeAboutYouScreen,
  CustHomeScreen,
  TradePageScreen,
  SelectTradeScreen,
  TradeClientQuestionScreen,
  TradeLocationScreen,
  CorrectPinScreen,
  TradeWorkingRadiusScreen,
  PaymentConfirmationScreen,
  TradeJobsScreen,
  RequestsScreen,
  ConfirmPaymentScreen,
  CustSettingScreen,
  SearchResultsScreen,
  TradeSkillsScreen,
  FinishedSetUpScreen,
  AnalyticsTradeScreen,
  VerificationScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import CustomDrawer from "./components/CustomDrawerContent";
import { RectangleGroupIcon } from "react-native-heroicons/solid";
import { Text, Dimensions } from "react-native";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => {
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ drawerItemStyle: { height: 0 } }}
      />
      {/* <Drawer.Screen name="My Profile" component={TradeProfileScreen} /> */}
      <Drawer.Screen
        name="My Profile"
        component={TradeProfileScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              My Profile
            </Text>
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              Payment
            </Text>
          ),
        }}
      /> */}

      {/* <Drawer.Screen
        name="Analytics"
        component={AnalyticsTradeScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              Analytics
            </Text>
          ),
        }}
      /> */}

      {/* Settings */}
      <Drawer.Screen
        name="Settings"
        component={CustSettingScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomerStack = ({ navigation }) => {
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <Drawer.Navigator
      initialRouteName="CustomerHomeScreen"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {/* <Drawer.Screen name="Home" component={CustHomeScreen} /> */}
      <Drawer.Screen
        name="Home"
        component={CustHomeScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              Home
            </Text>
          ),
        }}
      />

      <Drawer.Screen
        name="CustSettings"
        component={CustSettingScreen}
        options={{
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                // fontWeight: focused ? "bold" : "normal",
                fontWeight: "bold",
                marginLeft: Dimensions.get("window").width * 0.05,
                fontSize: Dimensions.get("window").width * 0.04,
                fontFamily: "Avenir",
              }}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          animationEnabled: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="CustomerHome" component={CustomerStack} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="AccountType" component={AccountTypeScreen} />
        <Stack.Screen
          name="TradeRegistration"
          component={TradeRegistrationScreen}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="TradeProfile" component={TradeProfileScreen} />
        <Stack.Screen name="TradePage" component={TradePageScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="StartSetUp" component={StartSetUpScreen} />
        <Stack.Screen name="TradeAboutYou" component={TradeAboutYouScreen} />
        <Stack.Screen name="SelectTrade" component={SelectTradeScreen} />
        <Stack.Screen
          name="TradeClientQuestion"
          component={TradeClientQuestionScreen}
        />
        <Stack.Screen name="TradeLocation" component={TradeLocationScreen} />
        <Stack.Screen name="CorrectPin" component={CorrectPinScreen} />
        <Stack.Screen
          name="TradeWorkingRadius"
          component={TradeWorkingRadiusScreen}
        />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmationScreen}
        />
        <Stack.Screen name="TradeJobs" component={TradeJobsScreen} />
        <Stack.Screen name="RequestJob" component={RequestsScreen} />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPaymentScreen} />
        <Stack.Screen name="CustSetting" component={CustSettingScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="TradeSkills" component={TradeSkillsScreen} />
        <Stack.Screen name="FinishedSetUp" component={FinishedSetUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="AnalyticsTrade" component={AnalyticsTradeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
