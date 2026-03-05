import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppToastProvider, useAppToast } from './src/components/AppToast';
import { setToastRef } from './src/utils/toastRef';
import AuthStack from './src/Stacks/AuthStack/AuthStack';
import { persistor, Store } from './src/redux/store';
import { resetOnboardingAndPostApproval } from './src/redux/actions';
import { PersistGate } from 'redux-persist/integration/react';
import { configureGoogleSignIn } from './src/utils/socialAuth';

const Stack = createStackNavigator();

function ToastRefSetter() {
  const toast = useAppToast();
  useEffect(() => {
    setToastRef(toast);
    return () => setToastRef(null);
  }, [toast.showError, toast.showWarning, toast.showSuccess, toast.hideAll]);
  return null;
}

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    configureGoogleSignIn();
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          Store.dispatch(resetOnboardingAndPostApproval());
        }}
      >
        <AppToastProvider>
          <ToastRefSetter />
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle={'light-content'} />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </AppToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
