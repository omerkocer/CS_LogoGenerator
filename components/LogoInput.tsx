import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence,
  Easing
} from 'react-native-reanimated';

type Status = 'idle' | 'processing' | 'done';

const CircularLoader = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.loaderCircle, animatedStyle]}>
        <View style={styles.loaderInner} />
      </Animated.View>
    </View>
  );
};

export function LogoInput() {
  const router = useRouter();
  const [prompt, setPrompt] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [timeLeft, setTimeLeft] = useState(5);
  const MAX_LENGTH = 500;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'processing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, timeLeft]);

  const handleGenerate = () => {
    if (prompt.trim()) {
      setStatus('processing');
      setTimeLeft(5);
      const delay = 5000;
      
      setTimeout(() => {
        setStatus('done');
      }, delay);
    }
  };

  const handleStatusPress = () => {
    if (status === 'done') {
      router.push({
        pathname: '/(tabs)/output',
        params: { prompt }
      });
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

  const renderStatusComponent = () => {
    if (status === 'idle') return null;

    return (
      <TouchableOpacity 
        style={[
          styles.processingContainer,
          status === 'done' && styles.doneContainer
        ]}
        onPress={handleStatusPress}
      >
        <View style={styles.processingContent}>
          {status === 'processing' ? (
            <CircularLoader />
          ) : (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
          <View style={styles.processingTextContainer}>
            <Text style={styles.processingTitle}>
              {status === 'processing' ? 'Creating Your Design...' : 'Your Design is Ready'}
            </Text>
            <Text style={styles.processingSubtitle}>
              {status === 'processing' ? `Ready in ${timeLeft} seconds` : 'Tap to see it'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderStatusComponent()}

      <View style={styles.inputWrapper}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Enter your prompt</Text>
          <TouchableOpacity onPress={handleSurprise}>
            <Text style={styles.surpriseText}>🎲 Surprise me</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="A blue lion logo reading 'HEXA' in bold letters"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={MAX_LENGTH}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
          <Text style={styles.charCount}>
            {prompt.length}/{MAX_LENGTH}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, !prompt.trim() && styles.buttonDisabled]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || status === 'processing'}
        >
          <Text style={styles.buttonText}>✨ Create</Text>
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
  processingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  doneContainer: {
    backgroundColor: '#34C759',
  },
  processingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loaderContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  loaderCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
  },
  loaderInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  processingTextContainer: {
    flex: 1,
  },
  processingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  processingSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  inputWrapper: {
    gap: 12,
  },
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
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
}); 