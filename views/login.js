import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebaseconfig'; // Importando Firebase

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    // Verifica se o usuário já está logado ao iniciar o app
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Se já estiver logado, redireciona para a tela principal ou outra tela desejada
        navigation.navigate('Home'); // Substitua 'Home' pela tela que o usuário deve acessar
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, [navigation]);

  const handleLogin = async () => {
    try {
      // Chama a função com a instância auth corretamente
      await signInWithEmailAndPassword(auth, email, senha);
      // Navega para a tela principal após o login bem-sucedido
      navigation.navigate('Home'); // Substitua 'Home' pela tela que o usuário deve acessar
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", error.message); // Exibir mensagem de erro ao usuário
    }
  };

  return (
    <LinearGradient
      colors={['#8B0000', '#8B0000']} // Gradiente vermelho
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Entrar</Text>
        
        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={email}
          onChangeText={setEmail} // Atualiza o estado do email
        />
        
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha} // Atualiza o estado da senha
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu Senha?</Text>
        </TouchableOpacity>

        {/* Navegação para a página de Cadastro */}
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('Cadastro')} // Navegar para a tela Cadastro
        >
          <Text style={styles.signupText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin} // Chama a função handleLogin ao pressionar o botão
        >
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
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
    color: '#FFFFFF',
    marginBottom: 20,
  },
  signupButton: {
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
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
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
