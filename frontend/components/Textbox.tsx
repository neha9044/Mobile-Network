import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const Textbox: React.FC = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.title, 
        { textAlign: isTablet ? 'center' : 'left' }
      ]}>
        Welcome to the new era of professional networking
      </Text>
      <Text style={[
        styles.description, 
        { textAlign: isTablet ? 'center' : 'left' }
      ]}>
        People Search 3.0 is in full swing in network by Infidhi.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 20,
  },
  title: {
    fontSize: 38,
    color: '#1e293b',
    lineHeight: 44,
    fontWeight: '500',
    fontFamily: 'InstrumentSerif',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    fontFamily: 'InstrumentSerif',
  },
});

export default Textbox;