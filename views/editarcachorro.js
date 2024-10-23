import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebaseconfig';
import { doc, updateDoc } from 'firebase/firestore';

export default function EditarCachorro({ route, navigation }) {
  const { dogId, dogData } = route.params;
  const [apelido, setApelido] = useState(dogData.apelido);
  const [nascimento, setNascimento] = useState(dogData.nascimento);
  const [peso, setPeso] = useState(dogData.peso);
  const [porte, setPorte] = useState(dogData.porte);

  const handleUpdateDog = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    try {
      const dogDocRef = doc(db, 'tutors', user.uid, 'cachorros', dogId);
      await updateDoc(dogDocRef, {
        apelido,
        nascimento,
        peso,
        porte,
      });
      Alert.alert("Sucesso", "Cachorro atualizado com sucesso!");
      navigation.goBack(); // Volta para a lista de cachorros
    } catch (error) {
      console.error("Erro ao atualizar cachorro:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados do cachorro.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cachorro</Text>
      <TextInput
        style={styles.input}
        value={apelido}
        onChangeText={setApelido}
        placeholder="Apelido"
      />
      <TextInput
        style={styles.input}
        value={nascimento}
        onChangeText={setNascimento}
        placeholder="Nascimento"
      />
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={porte}
        onChangeText={setPorte}
        placeholder="Porte"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateDog}>
        <Text style={styles.updateText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
