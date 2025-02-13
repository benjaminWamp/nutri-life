import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <Link href="/(auth)/sign-in">
        <Text>Sign in</Text>
      </Link>
      <Link href="/(auth)/sign-up">
        <Text>Sign up</Text>
      </Link>
      <Button onPress={() => signOut()} title="Déconnexion" />
    </View>
  );
}
