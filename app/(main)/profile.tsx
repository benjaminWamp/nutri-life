import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useAuth, useUser } from "@clerk/clerk-expo";

const profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{user ? user.primaryEmailAddress?.emailAddress : "Aucun mail"}</Text>
      <Button onPress={() => signOut()}>Déconnexion</Button>
    </View>
  );
};

export default profile;
