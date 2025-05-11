import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { LogoInput } from '@/components/LogoInput';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#100E19', '#241B39', '#100E19']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.1, y: 0 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>AI Logo</Text>
        </View>

        <LogoInput />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical:12
  },
});
