import React, {useState, useEffect} from 'react';

import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';

export default function AuthScreen() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
 
  const [user, setUser] = useState(null);
 
  useEffect(() => {

    // subscribe to auth state

    const unsubscribe = auth().onAuthStateChanged(u => {

      setUser(u);

    });

    return unsubscribe; // unsubscribe on unmount

  }, []);
 
  async function handleSignUp() {

    try {

      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);

      // optional: send verification email

      await userCredential.user.sendEmailVerification();

      Alert.alert('Signed up', 'Verification email sent — check your inbox.');

    } catch (e) {

      console.error(e);

      Alert.alert('Signup error', e.message);

    }

  }
 
  async function handleSignIn() {

    try {

      await auth().signInWithEmailAndPassword(email.trim(), password);

      Alert.alert('Signed in', `Welcome back ${email}`);

    } catch (e) {

      console.error(e);

      Alert.alert('Signin error', e.message);

    }

  }
 
  async function handleSignOut() {

    try {

      await auth().signOut();

      Alert.alert('Signed out');

    } catch (e) {

      console.error(e);

    }

  }
 
  async function handleResetPassword() {

    try {

      await auth().sendPasswordResetEmail(email.trim());

      Alert.alert('Password reset', 'Check your email for reset link.');

    } catch (e) {

      console.error(e);

      Alert.alert('Reset error', e.message);

    }

  }
 
  return (
<View style={styles.container}>
<Text style={styles.title}>{user ? `Hello ${user.email}` : 'Not signed in'}</Text>
 
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
 <Icon name="apple" size={30} color="#900" />
      <Button title="Sign Up" onPress={handleSignUp} />
<View style={{height:10}} />
<Button title="Sign In" onPress={handleSignIn} />
<View style={{height:10}} />
<Button title="Reset Password" onPress={handleResetPassword} />
<View style={{height:10}} />
<Button title="Sign Out" onPress={handleSignOut} />
</View>

  );

}
 
const styles = StyleSheet.create({

  container:{flex:1,padding:20,justifyContent:'center'},

  input:{borderWidth:1,borderColor:'#ddd',padding:10,marginBottom:10,borderRadius:6},

  title:{fontSize:18,marginBottom:12,textAlign:'center'}

});

 