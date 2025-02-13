import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [securityVisible, setSecurityVisible] = React.useState(true);

  const [error, setError] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      setError(true);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ padding: 20, justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          backgroundColor: "brown",
          color: "white",
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 5,
          marginBottom: 10,
          display: error ? "flex" : "none",
        }}
      >
        Attention, votre email ou votre mot de passe ne correspont pas
      </Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        label="Email"
        placeholder="Entrer email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        mode="outlined"
        style={{ marginBottom: 10 }}
        error={error}
      />
      <TextInput
        value={password}
        label="Mot de passe"
        placeholder="Entrer mot de passe"
        secureTextEntry={securityVisible}
        right={<TextInput.Icon icon="eye" onPress={() => setSecurityVisible(!securityVisible)} />}
        onChangeText={(password) => setPassword(password)}
        mode="outlined"
        style={{ marginBottom: 10 }}
        error={error}
      />
      <Button mode="contained" onPress={onSignInPress} style={{ marginBottom: 10 }}>
        Se connecter
      </Button>
      <View>
        <Link href="/sign-up">
          <Text>
            Vous n'avez pas de compte ? <Text style={{ fontWeight: "bold" }}>Connexion</Text>
          </Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
