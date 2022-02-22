import React, { createContext, useEffect } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import { useState } from 'react';
import cafeApi from '../api/cafeApi';
import { ImagePickerResponse } from "react-native-image-picker";


type ProductsContextProps = {
    isLoading: boolean,
    products: Producto[],
    loadProducts: () => Promise<any>
    addProduct: (categoryId: string, name: string) => Promise<any>
    updateProduct: (categoryId: string, name: string, productId: string) => Promise<any>
    deleteProdcut: (productId: string) => Promise<any>
    loadProductById: (productId: string) => Promise<Producto>,
    uploadImage: (data: any, id: string) => Promise<void> // todo: modify any type data parameter
}

export const ProductsContext = createContext({} as ProductsContextProps);


export const ProductsProvider = ({ children }: any) => {


    const [products, setproducts] = useState<Producto[]>([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {

        loadProducts();

    }, [])



    const loadProducts = async () => {

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setisLoading(true);
        setproducts([...resp.data.productos])

        setisLoading(false);

    }

    const addProduct = async (categoryId: string, name: string) => {


        const resp = await cafeApi.post<Producto>('/productos', { nombre: name, categoria: categoryId });

        setproducts([...products, resp.data])

        return resp.data;


    }
    const updateProduct = async (categoryId: string, name: string, productId: string) => {

        const resp = await cafeApi.put<Producto>(`/productos/${productId}`, { nombre: name, categoria: categoryId });


        setproducts(products.map( (prod)=>{
            return (prod._id === resp.data._id) ? resp.data : prod;
        }))

    }
    const deleteProdcut = async (productId: string) => {

    }
    const loadProductById = async (productId: string): Promise<Producto> => {
        const resp = await cafeApi.get(`/productos/${productId}`);

        return resp.data;


    }

    const uploadImage = async (data: ImagePickerResponse, id: string) => {

        const fileToUpload = {
            uri: data.assets![0].uri,
            type: data.assets![0].type,
            name: data.assets![0].fileName

        }

        const formData = new FormData();

        formData.append('archivo', fileToUpload);


        try {
            
            const resp = await cafeApi.put(`/uploads/usuarios/${id}`, formData);


            console.log(resp);



        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProdcut,
            loadProductById,
            uploadImage,
            isLoading
        }}>
            {children}
        </ProductsContext.Provider>
    )
}