import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { APPID, BASE_URL, LANGUAGE, PROTOCOL, MEDIDA } from '@env';
import InfoClima from './components/InfoClima';

export default function App() {

    const [cidade, setCidade] = useState('');
    const [previsao, setPrevisao] = useState(undefined);
    const [flag, setFlag] = useState(false);

    const capturarCidade = (cidadeDigitada) => {
        setCidade(cidadeDigitada);
    }

    const capturarLatitudeELongitude = () => {
        const url = encodeURI(`${PROTOCOL}://api.openweathermap.org/geo/1.0/direct?
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
        try {
            const [latitude, longitude] = await capturarLatitudeELongitude();
            const url = encodeURI(`${PROTOCOL}://${BASE_URL}?lang=${LANGUAGE}&appid=${APPID}&lat=${latitude}&lon=${longitude}&units=${MEDIDA}`)
            
            return fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.current)
                    const clima = {
                        nascerDoSol: new Date(json.current.sunrise * 1000),
                        porDoSol: new Date(json.current.sunset * 1000),
                        icone: json.current.weather[0].icon,
                        sensacao: json.current.feels_like
                    }
    
                    setPrevisao(clima);
                    setFlag(true);
                })
                .catch((erro) => {
                    alert(erro.message);
                })
            ;
        } catch (erro) {
            setFlag(false);
            alert(erro.message);
        }
        
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
                    color="#00af13"
                    title="Buscar"
                    onPress={obterPrevisao}
                />
            </View>
            {flag ? <InfoClima cidade={cidade} previsao={previsao}/> : null}
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
        borderBottomColor: '#00af13',
        borderBottomWidth: 2,
        marginBottom: 4,
        textAlign: 'center',
    },
});
