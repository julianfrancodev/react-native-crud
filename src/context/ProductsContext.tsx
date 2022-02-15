import React, { createContext, useEffect } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import { useState } from 'react';
import cafeApi from '../api/cafeApi';


type ProductsContextProps = {
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


    useEffect(() => {

        loadProducts();
    
    }, [])
    


    const loadProducts = async () => {

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');

        // setproducts([...products, ...resp.data.productos])
        setproducts([...resp.data.productos])

    }

    const addProduct = async (categoryId: string, name: string) => {

    }
    const updateProduct = async (categoryId: string, name: string, productId: string) => {

    }
    const deleteProdcut = async (productId: string) => {

    }
    const loadProductById = async (productId: string) => {
        throw new Error('Not implemented')
    }
    const uploadImage = async (data: any, id: string) => {

    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProdcut,
            loadProductById,
            uploadImage
        }}>
            {children}
        </ProductsContext.Provider>
    )
}