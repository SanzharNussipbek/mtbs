import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { client } from "./apollo";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ApolloProvider client={client}>
            <NativeBaseProvider disableContrastText>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </NativeBaseProvider>
          </ApolloProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
