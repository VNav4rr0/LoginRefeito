import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { db, auth } from '../firebaseconfig'; // Certifique-se de que está importando corretamente o db e auth

export default function Home({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Deslogar o usuário
      navigation.navigate('Login'); // Navegar de volta para a tela de login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      Alert.alert("Erro", "Não foi possível deslogar.");
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CadastroDog')}>
        <Text style={styles.addText}>Adicionar Cachorro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Perfiltutor')}>
        <Text style={styles.addText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ListaCachorros')}>
        <Text style={styles.addText}>ListaCachorros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
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
  },
  dogText: {
    fontSize: 16,
    color: '#333',
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
  logoutButton: {
    backgroundColor: '#B22222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
