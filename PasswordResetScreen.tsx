import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';

// import { RootStackParamList } from '../../navigation/AppNavigator';
import auth from '@react-native-firebase/auth';

// type PasswordResetNavigationProp = StackNavigationProp<RootStackParamList>;

const PasswordResetScreen: React.FC = () => {
  // const navigation = useNavigation<PasswordResetNavigationProp>();
  const [email, setEmail] = useState('');

  const isValidEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const handleSendCode = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      // const signInMethods = await auth().fetchSignInMethodsForEmail(email);
      await auth().sendPasswordResetEmail(email);
      // if (signInMethods.length === 0) {
      //   Alert.alert('Email Not Found', 'No account found with this email address.');
      //   return;
      // }
      Alert.alert('Check your email for password reset link!');
      // navigation.navigate('VerifyCode', { email });
      // navigation.navigate('PasswordConfirm');
    } catch (error: any) {
      Alert.alert('Error', 'An error occurred while verifying the email.');
    }
  };

  return (
    <View style={styles.container}>
    {/*   <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
         <Text style={{ color: '#fff', fontSize: 18 }}>{'<'} Back</Text>
       </Pressable> */}

      <View style={styles.card}>
        <Text style={styles.title}>Forgot password?</Text>
        <Text style={styles.subtitle}>
          Don’t worry! It happens. Please enter the email associated with your account.
        </Text>
      </View>

      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email address"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Pressable
        style={[styles.button, (!email || !isValidEmail(email)) && styles.buttonDisabled]}
        onPress={handleSendCode}
        disabled={!email || !isValidEmail(email)}
      >
        <Text style={styles.buttonText}>SEND CODE</Text>
      </Pressable>

      <View style={styles.stepContainer}>
        <Text style={styles.stepLabel}>Step 1 of 3</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2A47',
    padding: 24,
  },
  backButton: {
    marginTop: 60,
    marginBottom: 24,
  },
  card: {
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    color: '#aaa',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E2640',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFC833',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  stepContainer: {
    marginTop: 'auto',
  },
  stepLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#11182B',
    borderRadius: 4,
  },
  progressFill: {
    width: '33.3%',
    height: '100%',
    backgroundColor: '#FFC833',
    borderRadius: 4,
  },
});

export default PasswordResetScreen;


