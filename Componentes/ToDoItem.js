import React, {useState, useRef, useEffect} from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Switch, LayoutAnimation, UIManager, Platform, Touchable, PanResponder } from 'react-native';


if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TodoItem = ({ item, trocaEstado, deleta}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animationValue = useRef(new Animated.Value(0)).current
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x}],
                                { useNativeDriver: false }),
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -200) {
                deleta(item.id)
            }
            else {
                Animated.spring(
                    pan,
                    {toValue: {x: 0, y: 0},
                    useNativeDriver: false},
                    ).start()
            }
        },                            
    })).current

    const expand = () => {
        LayoutAnimation.spring()
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: item.completado ? 0.25 : 1, //adjust opacity is needed
            duration: 1000,
            useNativeDriver: false,
            }).start();
    }, [item.completado])

    return (
        <Animated.View {...panResponder.panHandlers}
            style={[pan.getLayout(), styles.container, {opacity: animationValue}]}>
            <View style={styles.todoItem}>
                <Switch
                    value={item.completado}
                    onValueChange={() => trocaEstado(item.id)}
                />
                <View style={styles.textContainer}>
                <TouchableOpacity onPress={expand}>
                    <Text style={item.completado ? styles.completedText : styles.text}>
                        {item.tarefa.nome}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            {isExpanded && (
                <View>
                    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>&#8226; Data: </Text>{item.tarefa.data.toLocaleString().split(' ')[0]}</Text>
                    <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>&#8226; Descrição: </Text> {item.tarefa.descricao}</Text>
                </View>
            )}
        </Animated.View>    
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
    },
    completedText: {
        textDecorationLine: 'line-through',
        fontSize: 18,
    },
    deleteButton: {
        color: 'red',
        fontSize: 18,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
});

export default TodoItem;
