import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { auth, db } from '../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ListaCachorros({ navigation }) {
  const [dogs, setDogs] = useState([]); // Estado para armazenar a lista de cachorros

  const fetchDogs = async () => {
    const user = auth.currentUser; // Obtém o usuário logado
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    try {
      // Referência à subcoleção 'cachorros' do usuário logado
      const dogsCollectionRef = collection(db, 'tutors', user.uid, 'cachorros'); // Ajuste aqui
      const snapshot = await getDocs(dogsCollectionRef);

      // Cria uma lista de cachorros a partir dos dados do Firestore
      const dogsList = snapshot.docs.map(doc => ({
        id: doc.id, // Salva o ID do documento
        ...doc.data() // Pega os dados do documento
      }));

      setDogs(dogsList); // Atualiza o estado com a lista de cachorros
    } catch (error) {
      console.error("Erro ao buscar cachorros:", error);
      Alert.alert("Erro", "Não foi possível carregar os cachorros.");
    }
  };

  useEffect(() => {
    fetchDogs();

    // Adiciona listener para quando a tela for focada
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDogs(); // Chama a função para buscar cachorros
    });

    // Limpa o listener quando o componente for desmontado
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Seus Cachorros</Text>

      <FlatList
        data={dogs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.dogItem}>
            <Text style={styles.dogText}>Apelido: {item.apelido}</Text>
            <Text style={styles.dogText}>Nascimento: {item.nascimento}</Text>
            <Text style={styles.dogText}>Peso: {item.peso} Kg</Text>
            <Text style={styles.dogText}>Porte: {item.porte}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditarCachorros', { dogId: item.id, dogData: item })}>
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => <Text>Nenhum cachorro cadastrado.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CadastroDog')}>
        <Text style={styles.addText}>Adicionar Cachorro</Text>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dogItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  dogText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 15,
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addText: {
    color: '#fff',
    fontSize: 18,
  },
});
