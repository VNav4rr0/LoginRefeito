import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebaseconfig'; // Certifique-se de que está importando corretamente o db e auth

// Importações necessárias para o Firestore
import { collection, addDoc } from "firebase/firestore"; 

export default function CadastroDog({ navigation }) {
  const [apelido, setApelido] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [peso, setPeso] = useState('');
  const [porte, setPorte] = useState('');

  const handleCadastro = async () => {
    const user = auth.currentUser; // Obtém o usuário logado
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    if (!apelido || !nascimento || !peso || !porte) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Referência para a subcoleção 'cachorros' do tutor logado
      const dogsCollectionRef = collection(db, 'tutors', user.uid, 'cachorros');

      // Adiciona o novo cachorro na subcoleção
      await addDoc(dogsCollectionRef, {
        apelido,
        nascimento,
        peso,
        porte,
      });

      Alert.alert("Sucesso", "Cachorro cadastrado com sucesso!");

      // Redirecionar para a tela Home após o cadastro
      navigation.navigate('ListaCachorros');
    } catch (error) {
      console.error("Erro ao cadastrar o cachorro:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o cachorro.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre novos cachorros!</Text>

      <TextInput
        style={styles.input}
        placeholder="Apelido"
        value={apelido}
        onChangeText={setApelido}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={nascimento}
        onChangeText={setNascimento}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Porte"
        value={porte}
        onChangeText={setPorte}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
