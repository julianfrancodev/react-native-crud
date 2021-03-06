import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Image, } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

function ProductScreen(props: Props) {
    const { route, navigation } = props;

    const { name = '', id = '' } = route.params;

    const [tempUri, settempUri] = useState<string>();

    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext)

    const { categories, isLoading } = useCategories();

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: '',
        categoriaId: '',
        nombre: name,
        img: ''
    });



    useEffect(() => {
        navigation.setOptions({
            headerTitle: (nombre) ? nombre : 'Nombre del producto'
        })
    }, [nombre])

    useEffect(() => {

        loadProduct();

    }, [])



    const loadProduct = async () => {
        if (id.length === 0) return;
        const product = await loadProductById(id);
        console.log(product, 'producttototototo')
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            nombre: nombre,
            img: product.img || ''
        })
    }


    const saveOrUpdate = async () => {
        if (id.length > 0) {

            updateProduct(categoriaId, nombre, id)

        } else {

            const tempCategoriaId = categoriaId || categories[0]._id
            const newProduct = await addProduct(tempCategoriaId, nombre);
            onChange(newProduct.id, '_id');
        }
    }


    const takePhoto = () => {
        launchCamera({ mediaType: 'photo', quality: 0.5 }, (resp) => {
            if (resp.didCancel) return;

            if (!resp.assets![0].uri!) return;

            settempUri(resp.assets![0].uri);
            uploadImage(resp, id);
        });
    }


    const getImageFromLibrary = () => {
        launchCamera({ mediaType: 'photo', quality: 0.5 }, (resp) => {
            if (resp.didCancel) return;

            if (!resp.assets![0].uri!) return;

            settempUri(resp.assets![0].uri);
            uploadImage(resp, id);
        });
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Nombre del producto: </Text>
                <TextInput
                    placeholder='Producto'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                {/* Picker / Selector */}
                <Text style={styles.label}>Seleccione la cateogria: </Text>

                <Picker
                    selectedValue={categoriaId}
                    onValueChange={(itemValue, itemIndex) =>
                        onChange(itemValue, 'categoriaId')
                    }>
                    {
                        categories.map((category) => (
                            <Picker.Item label={category.nombre} value={category._id} key={category._id} />
                        ))
                    }


                </Picker>

                <Button
                    title='Guardar'
                    onPress={() => saveOrUpdate()}

                />

                {
                    (id.length > 0) &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>


                        <Button
                            title='Camara'
                            onPress={() => takePhoto()}

                        />
                        <Button
                            title='Galeria'
                            onPress={() => getImageFromLibrary()}

                        />
                    </View>

                }


                {
                    (img.length > 0 && !tempUri) &&

                    <Image
                        source={{ uri: img }}
                        style={{
                            width: '100%',
                            height: 300
                        }}
                    />
                }


                {
                    (tempUri) &&

                    <Image
                        source={{ uri: tempUri }}
                        style={{
                            width: '100%',
                            height: 300
                        }}
                    />
                }
                {/* Mostar Imagen Temporal */}


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


