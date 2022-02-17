import React, {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import { CategoriesResponse, Categoria } from '../interfaces/appInterfaces';


export const useCategories = ()=>{

    const [isLoading, setisLoading] = useState(true);
    const [categories, setcategories] = useState<Categoria[]>([]);

    useEffect(() => {
      
        getCategories();
    
    }, [])


    const getCategories = async ()=>{
        const resp = await cafeApi.get<CategoriesResponse>('/categorias');

        setcategories(resp.data.categorias)
        setisLoading(false);
    }
    


    return{
        categories,
        isLoading
    }

}