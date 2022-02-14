import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string, name?: string }
}

const Stack = createStackNavigator<ProductsStackParams>();

interface Props { }

function ProductsNavigator(props: Props) {
    const { } = props

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="ProductsScreen"
             component={ProductsScreen}
             options={{title: 'Productos'}}
              />

            <Stack.Screen 
            name="ProductScreen"
             component={ProductScreen}
             options={{title: 'Producto'}}
              />

        </Stack.Navigator>
    )
}

export default ProductsNavigator
