import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

function ProductScreen(props: Props) {
    const { route, navigation } = props;

    const { name } = route.params;

    const [selectedLanguage, setSelectedLanguage] = useState();


    useEffect(() => {
        navigation.setOptions({
            headerTitle: (name) ? name : 'Nuevo Producto'
        })
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Nombre del producto: </Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                />

                {/* Picker / Selector */}
                <Text style={styles.label}>Seleccione la cateogria: </Text>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <Button
                    title='Guardar'
                    onPress={() => []}

                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>


                    <Button
                        title='Camara'
                        onPress={() => []}

                    />
                    <Button
                        title='Galeria'
                        onPress={() => []}

                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20
    },
    label: {
        fontSize: 18
    },
    textInput: {
        marginTop: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 5,
        marginBottom: 10
    }
})


