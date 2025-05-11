import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onSurprisePress: () => void;
  disabled?: boolean;
}

export const Header = ({ onSurprisePress, disabled }: HeaderProps) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Enter your prompt</Text>
      <TouchableOpacity onPress={onSurprisePress} disabled={disabled}>
        <Text style={styles.surpriseText}>🎲 Surprise me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  surpriseText: {
    fontSize: 13,
    color: '#FAFAFA',
    lineHeight: 18,
    fontWeight: '400',
  },
}); 