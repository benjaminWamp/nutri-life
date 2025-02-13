import { Stack } from "expo-router";

const AddLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Ajouter une recette" }} />
    </Stack>
  );
};

export default AddLayout;
