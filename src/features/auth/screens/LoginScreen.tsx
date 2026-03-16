import { GOOGLE_CLIENT_IDS } from '@src/config/google';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { styles } from './LoginScreen.styles';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_IDS.web,
    iosClientId: GOOGLE_CLIENT_IDS.ios,
    androidClientId: GOOGLE_CLIENT_IDS.android,
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        signIn(authentication.accessToken).catch(() => {
          Alert.alert('Error', 'Failed to sign in. Please try again.');
        });
      }
    }
  }, [response, signIn]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/LoginPage.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[styles.googleButton, !request && styles.googleButtonDisabled]}
        onPress={() => promptAsync()}
        disabled={!request}
        activeOpacity={0.7}
      >
        {!request ? (
          <ActivityIndicator size="small" color="#4285F4" style={{ marginRight: 12 }} />
        ) : (
          <Image
            source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
            style={styles.googleIcon}
          />
        )}
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
