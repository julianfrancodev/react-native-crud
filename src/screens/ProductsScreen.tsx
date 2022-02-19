import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

function ProductsScreen(props: Props) {
    const { navigation } = props;

    const { products, loadProducts, isLoading } = useContext(ProductsContext);

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


    const onRefresth = async () =>{
        await loadProducts();
    }


    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresth}
                        refreshing={isLoading}
                    />
                }
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
                showsVerticalScrollIndicator={false}
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
