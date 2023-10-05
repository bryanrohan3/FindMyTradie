import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import { firebase } from '../../firebase/config'
import styles from './styles';

const TradeJobsScreen = ({ tradesmanId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobQuery = firebase.firestore().collection('jobs')
      .where('tradesmanId', '==', firebase.auth().currentUser.uid)
      .where('status', '==', 'Requested')
      .orderBy('createdAt', 'desc');
    const unsubscribe = jobQuery.onSnapshot(snapshot => {
      const jobData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobData);
    });
    return () => unsubscribe();
  }, [firebase.auth().currentUser.uid]);

  const handleJobResponse = async (jobId, response) => {
    await firebase.firestore().collection('jobs').doc(jobId).update({
      status: response,
      jobId: jobId,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Job', jobId, 'is now', response);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Job ID: {item.id}</Text>
      <Text>Customer: {item.customerName}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={() => handleJobResponse(item.id, 'accepted')} />
        <Button title="Decline" onPress={() => handleJobResponse(item.id, 'declined')} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Jobs</Text>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No pending jobs</Text>}
      />
    </View>
  );
};

export default TradeJobsScreen;

