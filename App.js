import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/login'; 
import Home from './views/home'; 
import Cadastro from './views/cadastro';
import CadastroDog from './views/cadastrodog'; 
import Perfiltutor from './views/perfiltutor'; 
import ListaCachorros from './views/listacachorros'; 
import EditarCachorros from './views/editarcachorro'; 


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Ocultar o cabeçalho padrão
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro
        />
        <Stack.Screen 
          name="CadastroDog" // Nome da tela de cadastro de cachorro
          component={CadastroDog} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro de cachorro
        />
          <Stack.Screen 
          name="Home" // Nome da tela de cadastro de cachorro
          component={Home} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro de cachorro
        />
         <Stack.Screen 
          name="Perfiltutor" // Nome da tela de cadastro de cachorro
          component={Perfiltutor} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro de cachorro
        />
         <Stack.Screen 
          name="ListaCachorros" // Nome da tela de cadastro de cachorro
          component={ListaCachorros} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro de cachorro
        />
         <Stack.Screen 
          name="EditarCachorros" // Nome da tela de cadastro de cachorro
          component={EditarCachorros} 
          options={{ headerShown: false }} // Ocultar o cabeçalho na tela de cadastro de cachorro
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
