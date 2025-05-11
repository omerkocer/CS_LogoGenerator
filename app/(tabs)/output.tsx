import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { LogoOutput } from '@/components/LogoOutput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function OutputScreen() {
  const { prompt } = useLocalSearchParams<{ prompt: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Generated Logo</ThemedText>
      </ThemedView>

      <LogoOutput prompt={prompt} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
}); 