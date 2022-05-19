import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { APPID, BASE_URL, CNT, LANGUAGE, PROTOCOL, UNITS } from '@env';

export default function App() {

    const [cidade, setCidade] = useState('');
    const [previsoes, setPrevisoes] = useState([]);

    const capturarCidade = (cidadeDigitada) => {
        setCidade(cidadeDigitada);
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
