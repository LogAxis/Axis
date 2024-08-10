import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Job } from '../job';

type Props = StackScreenProps<RootStackParamList, 'JobList'>;

const JobListScreen: React.FC<Props> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get<Job[]>('http://10.0.0.10:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          Alert.alert('Error fetching jobs', error.response?.data.message || 'An error occurred');
        } else {
          Alert.alert('Error fetching jobs', 'An unknown error occurred');
        }
      }
    };

    fetchJobs();
  }, []);

  const renderJob = ({ item }: { item: Job }) => (
    <View style={styles.jobContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Button title="View Details" onPress={() => navigation.navigate('JobDetails', { jobId: item.id })} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job List</Text>
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jobContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobListScreen;
