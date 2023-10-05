import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { firebase } from "../src/firebase/config";
import * as Icons from "react-native-heroicons/solid";
import styles from "./styles";

const Reviews = (props) => {
  const tradesmanId = props.id;

  const [reviews, setReviews] = useState([]);
  //Get reviews from firestore where tradesmanId is the same as tradesmanId and display them in a scrollview in seperate containers
  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("reviews")
      .where("tradesmanId", "==", tradesmanId)
      .onSnapshot((querySnapshot) => {
        const reviews = [];
        querySnapshot.forEach((documentSnapshot) => {
          reviews.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setReviews(reviews);
      });
    return () => subscriber();
  }, []);

  return (
    <View>
      <ScrollView>
        {reviews.map((review) => (
          <TouchableOpacity style={styles.otherBox} key={review.key}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={
                    review.customerProfilePicture
                      ? { uri: review.customerProfilePicture }
                      : require("../assets/null2.jpeg")
                  }
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    marginTop: "5%",
                    marginLeft: Dimensions.get("window").width * 0.07,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    marginLeft: 30,
                    marginTop: 20,
                    width: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").width * 0.035,
                      fontWeight: "bold",
                      fontFamily: "Avenir",
                    }}
                  >
                    {review.customerName}
                  </Text>
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").width * 0.03,
                      fontFamily: "Avenir",
                      marginTop: 2,
                      color: "gray",
                    }}
                  >
                    {review.review}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: "10%",
                  padding: 5,
                  paddingLeft: 10,
                  borderRadius: 20,
                  marginRight: Dimensions.get("window").width * 0.01,
                  backgroundColor: "#F1F1F1",
                }}
              >
                <Icons.StarIcon size={20} color="#2B2B2B" />
                <Text
                  style={{
                    fontSize: Dimensions.get("window").width * 0.035,
                    fontFamily: "Avenir",
                    marginLeft: Dimensions.get("window").width * 0.01,
                    paddingRight: 10,
                  }}
                >
                  {review.rating}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Reviews;
