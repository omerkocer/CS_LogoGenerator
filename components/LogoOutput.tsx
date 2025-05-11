import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface LogoOutputProps {
  prompt: string;
  imageUrl?: string;
}

export function LogoOutput({ prompt, imageUrl }: LogoOutputProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Your Prompt</ThemedText>
      <ThemedView style={styles.promptContainer}>
        <ThemedText style={styles.promptText}>{prompt}</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.title}>Generated Result</ThemedText>
      <ThemedView style={styles.outputContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        ) : (
          <ThemedText style={styles.loadingText}>Logo generation in progress...</ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  promptContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  promptText: {
    fontSize: 16,
    lineHeight: 24,
  },
  outputContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: 300,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
}); 