import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-web';

const InfoClima = (props) => {
    return (
        <View style={styles.cartao}>
            <View style={styles.segundaView}>
                <Image
                    style={styles.imagem}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${props?.previsao.icone}.png`
                    }}
                />
                <Text style={styles.texto}>Cidade: {props?.cidade}</Text>
                <Text style={styles.texto}>Sensação: {props?.previsao.sensacao}ºC</Text>
                <Text style={styles.texto}>
                    Nascer do sol: {props?.previsao.nascerDoSol.toLocaleTimeString("pt-br")}
                </Text>
                <Text style={styles.texto}>
                    Pôr do sol: {props?.previsao.porDoSol.toLocaleTimeString("pt-br")}
                </Text>
            </View>
        </View>
    );
}

export default InfoClima;

const styles = StyleSheet.create({
    cartao: {
        alignItems: 'center',
        marginBottom: 4,
        elevation: 4,
        padding: 12,
    },
    segundaView: {
        alignItems: 'center',
        border: '2px solid #00af13',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
    },
    imagem: {
        width: 50,
        height: 50,
    },
    texto: {
        fontWeight: 'bold'
    }
})