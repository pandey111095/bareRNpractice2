import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';

// import { RootStackParamList } from '../../navigation/AppNavigator';

// type PasswordConfirmNavigationProp = StackNavigationProp<RootStackParamList>;

const PasswordConfirmScreen: React.FC = () => {
  // const navigation = useNavigation<PasswordConfirmNavigationProp>();

  const handleReturn = () => {
    // navigation.replace('Login');
    return;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleReturn} style={styles.closeIcon}>
        <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
      </Pressable>

      <View style={styles.card}>
        <Image
          source={require('../../../assets/images/astroNetural.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>Password Reset Link Has Been Sent To Your Email!</Text>
      </View>

      <Pressable style={styles.button} onPress={handleReturn}>
        <Text style={styles.buttonText}>RETURN TO LOGIN</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1033',
    padding: 24,
  },
  closeIcon: {
    marginTop: 60,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  card: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFC833',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PasswordConfirmScreen;


