import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigation/navigator';
import Toast from 'react-native-toast-message';
import { ProductsProvider } from './src/context/ProductsContext';

interface Props { }


const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  )
}

function App(props: Props) {
  const { } = props

  return (
    <>
      <Toast />
      <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState>
      </NavigationContainer>
    </>

  )
}

export default App
