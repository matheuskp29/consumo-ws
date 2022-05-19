import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { APPID, BASE_URL, LANGUAGE, PROTOCOL, UNITS } from '@env';

export default function App() {

    const [cidade, setCidade] = useState('');
    const [previsao, setPrevisao] = useState([]);

    const capturarCidade = (cidadeDigitada) => {
        setCidade(cidadeDigitada);
    }

    const capturarLatitudeELongitude = () => {
        const url = encodeURI(`${PROTOCOL}://api.openweathermap.org/data/2.5/forecast?
        &lang=${LANGUAGE}&appid=${APPID}&q=${cidade}`)

        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                const latitude = json[0].lat;
                const longitude =json[0].lon;

                return [latitude, longitude];
            });
    }

    const obterPrevisao = async () => {
        const url = encodeURI(`${PROTOCOL}://${BASE_URL}?units=${UNITS}
        &lang=${LANGUAGE}&appid=${APPID}&lat=${latitude}&lon=${longitude}`)
        
        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                const clima = {
                    nascerDoSol: new Date(json.current.sunrise * 1000),
                    porDoSol: new Date(json.current.sunset * 1000),
                    icone: json.current.weather[0].icon,
                    sensacao: json.current.feels_like
                }

                setPrevisao(clima);
            })
            .catch((erro) => {
                alert(erro.message);
            })
        ;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cidadeView}>
                <TextInput style={styles.inputCidade}
                    placeholder="Digite o nome da cidade"
                    value={cidade}
                    onChangeText={capturarCidade}
                />
                <Button 
                    title="Buscar"
                    onPress={obterPrevisao}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40
    },
    cidadeView: {
        padding: 12,
        marginBottom: 8
    },
    inputCidade: {
        padding: 12,
        borderBottomColor: '#FF9800',
        borderBottomWidth: 2,
        marginBottom: 4,
        textAlign: 'center',
    }
});
