import React, { createContext } from "react";
import { Producto } from "../interfaces/appInterfaces";
import { useState } from 'react';


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


    const loadProducts = async () => { }
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