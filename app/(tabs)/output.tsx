import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet } from 'react-native';

import { LogoOutput } from '@/components/LogoOutput';

export default function OutputScreen() {
  return (
    <LinearGradient
      colors={['#100E19', '#241B39', '#100E19']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.1, y: 0 }}
    >
      <SafeAreaView style={styles.container}>
        <LogoOutput />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#100E19',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
}); 