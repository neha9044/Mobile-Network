import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

// Added { onPress } prop to the component
const Signup = ({ onPress }: { onPress?: () => void }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { alignSelf: isTablet ? 'center' : 'flex-start' }
      ]} 
      activeOpacity={0.8}
      onPress={onPress} // Attached the onPress prop here
    >
      <Ionicons name="mail-outline" size={22} color="#ffffff" />
      <Text style={styles.text}>Sign up with Mail</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 450,
    paddingVertical: 14,
    backgroundColor: '#12141c',
    borderRadius: 10,
    marginVertical: 6,
  },
  text: { 
    color: '#ffffff', 
    fontSize: 17, 
    fontWeight: '500' 
  },
});

export default Signup;