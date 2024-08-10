import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get('http://10.0.0.10:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          Alert.alert('Error fetching profile', error.response?.data.message || 'An error occurred');
        } else {
          Alert.alert('Error fetching profile', 'An unknown error occurred');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      await axios.put('http://10.0.0.10:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Profile Updated Successfully');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Profile Update Failed', error.response?.data.message || 'An error occurred');
      } else {
        Alert.alert('Profile Update Failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        style={styles.input}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
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

export default ProfileScreen;
