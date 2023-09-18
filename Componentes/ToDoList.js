import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, FlatList, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TodoItem from './ToDoItem';

const TodoList = ({ itens, trocaEstado, deleta}) => {
    const navigation = useNavigation();
    const navegaAddTarefa = () => {
        navigation.navigate('addTarefa');
    };
    return (
        <View style={styles.container}>
            <FlatList
            data={itens}
            renderItem={({ item}) => (
                <TodoItem item={item} trocaEstado={trocaEstado} deleta={deleta} />
            )}
            keyExtractor={item => item.id}
            />
            <Button title="Adicionar tarefa" onPress={navegaAddTarefa}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default TodoList;