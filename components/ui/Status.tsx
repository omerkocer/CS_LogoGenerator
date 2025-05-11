import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircularLoader } from './CircularLoader';

type StatusType = 'processing' | 'done' | 'error';

interface StatusProps {
  status: StatusType;
  timeLeft?: number;
  onPress: () => void;
}

export const Status = ({ status, timeLeft, onPress }: StatusProps) => {
  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <>
            <View style={styles.loaderMainContainer}>
              <CircularLoader />
            </View>
            <View style={styles.processingTextContainer}>
              <Text style={styles.processingTitle}>Creating Your Design...</Text>
              <Text style={styles.processingSubtitle}>Ready in {timeLeft} seconds</Text>
            </View>
          </>
        );
      case 'done':
        return (
          <>
            <View style={styles.successContainer}>
              <Image 
                source={require('../../assets/images/generatedLogoExample.jpg')} 
                style={styles.generatedLogo}
              />
            </View>
            <View style={styles.gradientContainer}>
              <LinearGradient
                colors={['#2938DC', '#943DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientText}
              >
                <Text style={styles.processingTitle}>Your Design is Ready!</Text>
                <Text style={styles.processingSubtitle}>Tap to see it</Text>
              </LinearGradient>
            </View>
          </>
        );
      case 'error':
        return (
          <>
            <View style={[styles.errorIconContainer, { backgroundColor: '#F37C7C' }]}>
              <Image 
                source={require('../../assets/icons/warn.png')} 
                style={styles.warnIcon}
                resizeMode="contain"
              />
            </View>
            <View style={[styles.processingTextContainer, { backgroundColor: '#EF4444', height: 70, borderTopRightRadius: 16, borderBottomRightRadius: 16, justifyContent: 'center' }]}>
              <Text style={styles.processingTitle}>Oops, something went wrong!</Text>
              <Text style={styles.processingSubtitle}>Click to try again</Text>
            </View>
          </>
        );
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.processingContainer,
        status === 'done' && styles.doneContainer,
        status === 'error' && styles.errorContainer
      ]}
      onPress={onPress}
    >
      <View style={styles.processingContent}>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  processingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 8,
    width: '100%',
    height: 70,
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
    backgroundColor: '#18181B',
    overflow: 'hidden',
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  processingTextContainer: {
    flex: 1,
    paddingLeft: 10,
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
  gradientContainer: {
    flex: 1,
    height: 70,
  },
  gradientText: {
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  errorIconContainer: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
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
  warnIcon: {
    width: 28,
    height: 28,
  },
}); 