import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebaseconfig'; // Importando Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

export default function Cadastro() {
  const navigation = useNavigation(); // Usando o hook useNavigation para obter o objeto de navegação

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [errors, setErrors] = useState({}); // Estado para armazenar erros
  const [feedback, setFeedback] = useState([]); // Estado para feedback de campos

  const validateFields = () => {
    // Resetar erros e feedback
    setErrors({});
    setFeedback([]);

    // Validações
    let valid = true;

    if (!nome) {
      setErrors(prev => ({ ...prev, nome: "Nome é obrigatório." }));
      valid = false;
    }
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: "Email é obrigatório." }));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: "Email inválido." }));
      valid = false;
    }

    if (!senha) {
      setErrors(prev => ({ ...prev, senha: "Senha é obrigatória." }));
      valid = false;
    } else if (senha.length < 6) {
      setErrors(prev => ({ ...prev, senha: "A senha deve ter pelo menos 6 caracteres." }));
      valid = false;
    }

    if (senha !== confirmarSenha) {
      setErrors(prev => ({ ...prev, confirmarSenha: "As senhas não coincidem!" }));
      valid = false;
    }

    // Atualiza feedback baseado nas validações
    if (!valid) {
      if (!nome) setFeedback(prev => [...prev, "Preencha o campo Nome."]);
      if (!email) setFeedback(prev => [...prev, "Preencha o campo Email."]);
      if (!/\S+@\S+\.\S+/.test(email)) setFeedback(prev => [...prev, "Email deve conter '@' e um domínio."]);
      if (!senha) setFeedback(prev => [...prev, "Preencha o campo Senha."]);
      if (senha.length < 6) setFeedback(prev => [...prev, "Senha deve ter pelo menos 6 caracteres."]);
      if (senha !== confirmarSenha) setFeedback(prev => [...prev, "As senhas não coincidem."]);
    }

    return valid;
  };

  const handleRegister = async () => {
    // Valida os campos antes de cadastrar
    if (!validateFields()) return;

    try {
      // Cadastrar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salvar dados do usuário no Firestore
      await setDoc(doc(db, "tutors", user.uid), {
        nome: nome,
        email: email,
      });

      // Exibir mensagem de sucesso
      Alert.alert("Cadastro realizado!", "Você foi cadastrado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", error.message); // Exibir mensagem de erro ao usuário
    }
  };

  return (
    <LinearGradient
      colors={['#8B0000', '#8B0000']} // Gradiente vermelho
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>Para começar, cadastre suas informações.</Text>
        
        {/* Campo Nome */}
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#B0B0B0"
          style={[styles.input, errors.nome && styles.inputError]}
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            validateFields();
          }}
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        {/* Campo Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          style={[styles.input, errors.email && styles.inputError]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateFields();
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        {/* Campo Senha */}
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          style={[styles.input, errors.senha && styles.inputError]}
          value={senha}
          onChangeText={(text) => {
            setSenha(text);
            validateFields();
          }}
        />
        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

        {/* Campo Confirmar Senha */}
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          style={[styles.input, errors.confirmarSenha && styles.inputError]}
          value={confirmarSenha}
          onChangeText={(text) => {
            setConfirmarSenha(text);
            validateFields();
          }}
        />
        {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}

        {/* Botão de Cadastro */}
        <TouchableOpacity 
          style={[styles.registerButton, !nome || !email || !senha || (senha !== confirmarSenha) ? styles.buttonDisabled : null]} 
          onPress={handleRegister} 
          disabled={!nome || !email || !senha || (senha !== confirmarSenha)} // Desabilitar o botão se houver erros
        >
          <Text style={styles.registerText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start', // Alinhar o texto de erro à esquerda
  },
  registerButton: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0', // Cor mais clara quando desabilitado
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'flex-start', // Alinhar o feedback à esquerda
    width: '100%', // Garantir que ocupe toda a largura
  },
  feedbackText: {
    color: '#FFD700', // Cor para o feedback
    fontSize: 14,
  },
});
