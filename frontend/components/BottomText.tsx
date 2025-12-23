import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

// Added { onPress } prop to the component
const BottomText = ({ onPress }: { onPress?: () => void }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { justifyContent: isTablet ? 'center' : 'flex-start' }
      ]}
      onPress={onPress} // Attached the onPress prop here
      activeOpacity={0.7}
    >
      <Text style={styles.grayText}>Already have an account? </Text>
      <Text style={styles.boldText}>Log in</Text>
      <Ionicons name="chevron-forward" size={16} color="#111827" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5, 
    width: '100%', 
    marginBottom: -30 
  },
  grayText: { 
    color: '#6b7280', 
    fontSize: 16 
  },
  boldText: { 
    color: '#111827', 
    fontWeight: '600', 
    fontSize: 16 
  },
});

export default BottomText;