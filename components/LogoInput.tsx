import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  withSequence,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type Status = 'idle' | 'processing' | 'done' | 'error';
type LogoStyle = 'no-style' | 'monogram' | 'abstract' | 'mascot';

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
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>('no-style');
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
      
      // Simulating random success/error
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      setTimeout(() => {
        setStatus(isSuccess ? 'done' : 'error');
      }, delay);
    }
  };

  const handleStatusPress = () => {
    if (status === 'done') {
      router.push({
        pathname: '/(tabs)/output',
        params: { prompt }
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

  const renderStatusComponent = () => {
    if (status === 'idle') return null;

    return (
      <TouchableOpacity 
        style={[
          styles.processingContainer,
          status === 'done' && styles.doneContainer,
          status === 'error' && styles.errorContainer
        ]}
        onPress={handleStatusPress}
      >
        <View style={styles.processingContent}>
          {status === 'processing' ? (
            <View style={styles.loaderMainContainer}>
                <CircularLoader />
            </View>
          ) : status === 'done' ? (
            <View style={styles.successContainer}>
              <Image 
                source={require('../assets/images/generatedLogoExample.jpg')} 
                style={styles.generatedLogo}
              />
            </View>
          ) : (
            <View style={styles.errorIconContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
            </View>
          )}
          <View style={styles.processingTextContainer}>
            {status === 'processing' ? (
              <>
                <Text style={styles.processingTitle}>Creating Your Design...</Text>
                <Text style={styles.processingSubtitle}>Ready in {timeLeft} seconds</Text>
              </>
            ) : status === 'done' ? (
              <LinearGradient
                colors={['#2938DC', '#943DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientText}
              >
                <Text style={styles.processingTitle}>Your Design is Ready!</Text>
                <Text style={styles.processingSubtitle}>Tap to see it</Text>
              </LinearGradient>
            ) : (
              <>
                <Text style={styles.errorTitle}>Oops, something went wrong!</Text>
                <Text style={styles.errorSubtitle}>Click to try again</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const logoStyles: { id: LogoStyle; label: string; image: any }[] = [
    { id: 'no-style', label: 'No Style', image: require('../assets/images/no-style.png') },
    { id: 'monogram', label: 'Monogram', image: require('../assets/images/monogram.png') },
    { id: 'abstract', label: 'Abstract', image: require('../assets/images/abstract.png') },
    { id: 'mascot', label: 'Mascot', image: require('../assets/images/mascot.png') },
  ];

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
  processingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 8,
    width: '100%',
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  doneContainer: {
    backgroundColor: 'transparent',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  processingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loaderMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#18181B',
    overflow: 'hidden',
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  loaderContainer: {
    width: 70,
    height: 70,
    backgroundColor:'#18181B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
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
    marginLeft:10
  },
  processingSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginLeft:10
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
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    overflow: 'hidden',
    height: 70,
  },
  generatedLogo: {
    width: 70,
    height: 70,
    borderRadius: 0,
  },
  gradientText: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height:70,
    textAlign:'center',
    justifyContent:'center'
  },
  errorIconContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 24,
  },
  errorTitle: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  errorSubtitle: {
    color: 'rgba(255, 59, 48, 0.7)',
    fontSize: 14,
  },
}); 