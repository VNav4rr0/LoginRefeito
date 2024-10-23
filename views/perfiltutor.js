import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebaseconfig'; 
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"; 

export default function PerfilUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      try {
        const userDocRef = doc(db, 'tutors', user.uid); 
        const userDoc = await getDoc(userDocRef); 

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNome(userData.nome || '');
          setEmail(user.email);
        } else {
          Alert.alert("Erro", "Dados do usuário não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const userDocRef = doc(db, 'tutors', user.uid);
      await updateDoc(userDocRef, { nome });
      Alert.alert("Sucesso", "Nome atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o nome.");
    }
  };

  const handleUpdatePassword = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, senhaAtual);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, novaSenha);
      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      setNovaSenha('');
      setSenhaAtual('');
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      Alert.alert("Erro", "Não foi possível atualizar a senha. Verifique a senha atual.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, senhaAtual);
    try {
      await reauthenticateWithCredential(user, credential);
      const userDocRef = doc(db, 'tutors', user.uid);
      await deleteDoc(userDocRef);
      await user.delete();
      Alert.alert("Conta deletada", "Sua conta foi deletada com sucesso.");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao deletar a conta:", error);
      Alert.alert("Erro", "Não foi possível deletar a conta. Verifique a senha atual.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        value={senhaAtual}
        onChangeText={setSenhaAtual}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Atualizar Nome</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Deletar Conta</Text>
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
  deleteButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
});
