import { tokenCache } from "../cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { RecipeProvider } from "../context/recipe";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  // useEffect(() => {
  //   console.log();

  //   AsyncStorage.clear();
  // }, []);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <RecipeProvider>
        <ClerkLoaded>
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Slot />
          </SafeAreaView>
        </ClerkLoaded>
      </RecipeProvider>
    </ClerkProvider>
  );
}
