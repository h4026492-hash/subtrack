import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SpendingGlobe3DProps = {
  message?: string;
};

const SpendingGlobe3D = ({ message = '3D globe unavailable on this device.' }: SpendingGlobe3DProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Globe</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    color: '#CBD5F5',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SpendingGlobe3D;
