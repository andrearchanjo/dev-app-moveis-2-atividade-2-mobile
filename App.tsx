import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  async function loadResourcesAsync() {
    await Promise.all([
      
    ]);
  }

  if (!isAppReady || !fontsLoaded) {
    return null;
  }

  return (
    <>
      <AppStack />
      <StatusBar style="auto" />
    </>
  );
}