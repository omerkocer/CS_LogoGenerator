import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export function LogoOutput() {
  const { prompt, style } = useLocalSearchParams<{ prompt: string; style: string }>();
  const router = useRouter();

  const handleClose = () => {
    router.replace('/');
  };

  const handleCopy = () => {
    // TODO: Implement copy functionality
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Design</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Image source={require('../assets/icons/close.png')} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/images/generatedLogoExample.jpg')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.promptContainer}>
        <View style={styles.promptHeader}>
          <Text style={styles.promptTitle}>Prompt</Text>
          <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
            <Image source={require('../assets/icons/copy.png')} style={styles.copyIcon} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.promptText}>{prompt}</Text>
        <View style={styles.styleTag}>
          <Text style={styles.styleTagText}>{style}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  copyButton: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  copyIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  copyText: {
    fontSize: 14,
    color: '#A1A1AA',
  },
  promptText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 12,
  },
  styleTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  styleTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
}); 