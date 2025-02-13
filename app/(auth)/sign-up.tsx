import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [securityVisible, setSecurityVisible] = React.useState(true);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ padding: 20, justifyContent: "center", flex: 1, alignItems: "center" }}
      >
        <Text style={{ marginBottom: 10, fontSize: 25 }}>Vérifier votre email</Text>
        <TextInput
          value={code}
          placeholder="Entrer votre code de verification"
          onChangeText={(code) => setCode(code)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <Button mode="contained" onPress={onVerifyPress} style={{ marginBottom: 10 }}>
          Vérifier
        </Button>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ padding: 20, justifyContent: "center", flex: 1, alignItems: "center" }}
    >
      <>
        <Text style={{ fontSize: 25, marginBottom: 15 }}>Inscription</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Entrer email"
          onChangeText={(email) => setEmailAddress(email)}
          style={{ width: "100%", marginBottom: 10 }}
          mode="outlined"
        />
        <TextInput
          value={password}
          placeholder="Entrer mot de passe"
          secureTextEntry={securityVisible}
          right={<TextInput.Icon icon="eye" onPress={() => setSecurityVisible(!securityVisible)} />}
          onChangeText={(password) => setPassword(password)}
          style={{ width: "100%", marginBottom: 10 }}
          mode="outlined"
        />
        <Button mode="contained" onPress={onSignUpPress} style={{ marginBottom: 10 }}>
          S'inscrire
        </Button>
      </>
    </KeyboardAvoidingView>
  );
}
