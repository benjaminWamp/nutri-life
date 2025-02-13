import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";

export default function Layout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="add" options={{ title: "Add" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
