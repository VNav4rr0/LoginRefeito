import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig'; // Importando Firebase

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home'); // Substitua 'Home' pela tela que o usuário deve acessar
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate('Home'); // Substitua 'Home' pela tela que o usuário deve acessar
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fundo.png')} // Coloque o caminho da sua imagem aqui
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu Senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.signupText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  title: {
    marginVertical: 370,
    left: -130,
    fontSize: 38,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000000',
  },
  forgotPassword: {
    left: -120,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  signupButton: {
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20, // Aumente o valor para mais arredondamento
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#B22222', // Botão vermelho escuro
    borderRadius: 20, // Aumente o valor para mais arredondamento
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
