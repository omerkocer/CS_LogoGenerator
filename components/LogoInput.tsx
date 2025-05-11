import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFirebase } from '../hooks/useFirebase';
import { Header } from './ui/Header';
import { Status } from './ui/Status';

type LogoStyle = 'no-style' | 'monogram' | 'abstract' | 'mascot';

export function LogoInput() {
  const router = useRouter();
  const [prompt, setPrompt] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>('no-style');
  const { saveLogo, loading: firebaseLoading, error: firebaseError } = useFirebase();
  const MAX_LENGTH = 500;

  const handleGenerate = async () => {
    if (prompt.trim()) {
      setStatus('processing');
      const randomDelay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; // Random between 30-60 seconds
      const delay = randomDelay;
      
      try {
        const logoData = {
          prompt,
          style: selectedStyle,
          status: 'processing',
          createdAt: new Date().toISOString()
        };
        
        await saveLogo(logoData);
        
        setTimeout(() => {
          setStatus('done');
        }, delay);
      } catch (error) {
        console.error('Error saving to Firebase:', error);
        setStatus('error');
      }
    }
  };

  const handleStatusPress = () => {
    if (status === 'done') {
      router.push({
        pathname: '/(tabs)/output',
        params: { prompt, style: selectedStyle }
      });
    } else if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSurprise = () => {
    const surprisePrompts = [
      "A minimalist tech company logo",
      "A playful food delivery service logo",
      "A professional law firm logo",
      "A creative design studio logo",
      "A modern fitness brand logo"
    ];
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    setPrompt(randomPrompt);
  };

  const logoStyles: { id: LogoStyle; label: string; image: any }[] = [
    { id: 'no-style', label: 'No Style', image: require('../assets/images/no-style.png') },
    { id: 'monogram', label: 'Monogram', image: require('../assets/images/monogram.png') },
    { id: 'abstract', label: 'Abstract', image: require('../assets/images/abstract.png') },
    { id: 'mascot', label: 'Mascot', image: require('../assets/images/mascot.png') },
  ];

  return (
    <View style={styles.container}>
      {status !== 'idle' && (
        <Status 
          status={status} 
          onPress={handleStatusPress} 
        />
      )}

      <View style={styles.inputWrapper}>
        <Header onSurprisePress={handleSurprise} disabled={status === 'processing'} />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              status === 'processing' && styles.inputDisabled
            ]}
            placeholder="A blue lion logo reading 'HEXA' in bold letters"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={MAX_LENGTH}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            editable={status !== 'processing'}
          />
          <Text style={styles.charCount}>
            {prompt.length}/{MAX_LENGTH}
          </Text>
        </View>

        <View style={styles.styleSelectorContainer}>
          <Text style={styles.styleLabel}>Logo Styles</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.styleScrollContent}
          >
            {logoStyles.map((style) => (
              <View key={style.id} style={styles.styleOptionWrapper}>
                <TouchableOpacity
                  style={[
                    styles.styleOption,
                    selectedStyle === style.id && styles.styleOptionSelected
                  ]}
                  onPress={() => setSelectedStyle(style.id)}
                  disabled={status === 'processing'}
                >
                  <Image source={style.image} style={styles.styleImage} />
                </TouchableOpacity>
                <Text style={[
                  styles.styleText,
                  selectedStyle === style.id && styles.styleTextSelected
                ]}>
                  {style.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGenerate}
          disabled={!prompt.trim() || status === 'processing'}
        >
          <LinearGradient
            colors={['#2938DC', '#943DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Create</Text>
              <Image 
                source={require('../assets/icons/stars.png')} 
                style={styles.starsIcon}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
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
  inputWrapper: {
    gap: 12,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    paddingBottom: 32,
  },
  charCount: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  button: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  styleSelectorContainer: {
    marginTop: 24,
  },
  styleLabel: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  styleScrollContent: {
    paddingRight: 24,
    gap: 16,
  },
  styleOptionWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  styleOption: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  styleOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  styleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  styleText: {
    color: '#71717A',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  styleTextSelected: {
    color: '#FFFFFF',
  },
  inputDisabled: {
    color: '#71717A',
  },
}); 