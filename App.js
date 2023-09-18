import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Componentes/Header';
import TodoList from './Componentes/ToDoList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaAddTarefa from './Telas/addTarefa';
import TelaLogin from './Telas/login';
import TelaAddUser from './Telas/addUser';
import firebase from './servicos/firebase';
import { getDatabase, ref, get, set, remove, update } from "firebase/database";

const Stack = createStackNavigator();
export default function App() {

  const [tarefas, setTarefas] = useState([ ]);
  
  const deleta = (tarefaId) => {
    const database = getDatabase(firebase)
    const tarefaRef = ref(database, 'tarefas/' + tarefaId.toString())

    remove(tarefaRef)
      .then(() => {
        console.log("Tarefa deletada com sucesso")
        setTarefas((Tarefas) => {
          let novasTarefas = Tarefas.filter((item) => item.id !== tarefaId)
          return novasTarefas
        })
      })
      .catch((error) => {
        console.log("Erro ao deletar tarefa: ", error)
      })
  }

  const trocaEstado = (tarefaId) => {
    const database = getDatabase(firebase)
    const tarefaRef = ref(database, 'tarefas/' + tarefaId.toString())
    const tarefaAtual = tarefas.find((item) => item.id === tarefaId);

    update(tarefaRef, {completado: !tarefaAtual.completado})
      .then(()=>{
        console.log("Tarefa atualizada com sucesso")
        setTarefas((Tarefas) =>
        {
          let novasTarefas = Tarefas.map((item) =>
          item.id === tarefaId ? { ...item, completado: !item.completado } : item)
          return novasTarefas
        })
      })
      .catch((error) => {
        console.error("Erro ao editar tarefa:", error);
      })
    }

    //setTarefas((Tarefas) =>
    //{
      //let novasTarefas = Tarefas.map((item) =>
      //item.id === tarefaId ? { ...item, completado: !item.completado } : item)
      //return novasTarefas
    //})
  
  const adicionaTarefa = (tarefa) => {
    const database = getDatabase(firebase);
    var id = Date.now().toString()
    const tarefaRef = ref(database, 'tarefas/' + id);
    set(tarefaRef, { tarefa: {...tarefa, data: tarefa.data.toString()}, completado: false })
      .then(() => {
        setTarefas((Tarefas) => [
          ...Tarefas,
          { id: id, tarefa: tarefa, completado: false },
        ])
        console.log("Tarefa adicionada com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao adicionar tarefa:", error);
      })
    }//no documento do professor, aqui é pra ter um }

    useEffect(() => {
      const database = getDatabase(firebase);
      const tarefasRef = ref(database, 'tarefas');
      get(tarefasRef)
       .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Dados de tarefas:', data);
          for(id in data) {
            setTarefas((Tarefas) => [
              ...Tarefas, 
              { id: id, tarefa: {...data[id].tarefa, data: new Date(data[id].tarefa.data)}, completado: data[id].completado },
            ])
          }
        } else {
          console.log('Nenhum dado encontrado.');
        }
       })
       .catch((error) => {
        console.error('Erro ao ler dados:', error);
       })
    }, [])

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false}}
        name="Login"
        component={TelaLogin}
      />
      <Stack.Screen name="Home" options={{ headerShown: false}}>
        {() => (
          <View style={styles.container}>
            <Header />
            <TodoList itens={tarefas} trocaEstado={trocaEstado} deleta={deleta} />
            <StatusBar style="auto" />
          </View>
        )}
        </Stack.Screen>
        <Stack.Screen
        options={{ headerShown: false}}
        name="addUser"
        component={TelaAddUser}
        />
      <Stack.Screen
        options={{ headerShown: false}}
        name="addTarefa"
        component={TelaAddTarefa}
        initialParams={{ addTarefa: adicionaTarefa}}
      />
    </Stack.Navigator>
  </NavigationContainer>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

