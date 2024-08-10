import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'ClientDashboard'>;

const ClientDashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Client Dashboard</Text>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Create Job" onPress={() => navigation.navigate('CreateJob')} />
      <Button title="Job List" onPress={() => navigation.navigate('JobList')} />
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
});

export default ClientDashboard;
