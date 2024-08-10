import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'CreateJob'>;

const CreateJobScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCreateJob = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.post(
        'http://10.0.0.10:5000/api/jobs',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Job Created Successfully');
      navigation.navigate('JobList');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Job Creation Failed', error.response?.data.message || 'An error occurred');
      } else {
        Alert.alert('Job Creation Failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Create Job" onPress={handleCreateJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default CreateJobScreen;

