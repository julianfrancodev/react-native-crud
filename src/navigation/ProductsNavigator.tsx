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
        <Stack.Navigator
            screenOptions={{
                cardStyle:{
                    backgroundColor: 'white'
                },
                headerStyle:{
                    elevation: 0, 
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen 
            name="ProductsScreen"
             component={ProductsScreen}
             options={{title: 'Productos', headerTitleAlign: 'center'}}
              />

            <Stack.Screen 
            name="ProductScreen"
             component={ProductScreen}
             options={{title: 'Producto',  headerTitleAlign: 'center'}}
              />

        </Stack.Navigator>
    )
}

export default ProductsNavigator
