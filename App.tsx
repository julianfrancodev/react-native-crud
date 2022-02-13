import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigation/navigator';
import Toast from 'react-native-toast-message';

interface Props { }


const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
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
