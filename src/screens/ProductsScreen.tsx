import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

function ProductsScreen(props: Props) {
    const { navigation } = props;

    const { products } = useContext(ProductsContext);

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.navigate('ProductScreen', { id: undefined, name: 'Nuevo Producto' })}
                >
                    <Text>
                        Agregar
                    </Text>
                </TouchableOpacity>
            )
        })

    }, [])


    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}
                    >
                        <View style={styles.tile}>
                            <Text style={styles.productName}>{item.nombre}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(p) => p._id}
                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}
            />
        </View>
    )
}

export default ProductsScreen;

const styles = StyleSheet.create({
    productName: {
        fontSize: 20
    },
    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginVertical: 10
    },
    tile: {
        marginVertical: 20
    }
})
