import React, { useEffect } from "react";
import { Text, View, FlatList, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useRecipe } from "../../../context/recipe";
import useDebounce from "../../../hooks/useDebounce";
import { router } from "expo-router";

const add = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const [meals, setMeals] = useState<any[]>([]);
  const [ingredientAdded, setIngredientAdded] = useState<Array<any>>([]);

  const { recipe, addRecipe } = useRecipe();

  const debounceValue = useDebounce(ingredient, 500);

  useEffect(() => {
    if (!debounceValue) return setMeals([]);

    getMeals();
  }, [debounceValue]);

  const getMeals = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?&app_id=${process.env.EXPO_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.EXPO_PUBLIC_EDAMAM_APP_KEY}&ingr=${ingredient}`,
      {}
    );
    const meals = await response.json();

    setMeals(meals.hints.map((hint: any) => hint));
  };

  const addIngredient = (ingredient: any) => {
    setIngredientAdded([...ingredientAdded, ingredient]);
    setMeals([]);
    setIngredient("");
  };

  const addRecipeToRecipes = () => {
    const recipeAddedList = {
      details: [...ingredientAdded],
      totalKCAL: ingredientAdded.reduce((acc, ingredient) => {
        return acc + parseInt(ingredient.food.nutrients.ENERC_KCAL);
      }, 0),
    };

    addRecipe(recipeAddedList);
    setIngredientAdded([]);
    router.push("/");
  };

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      borderColor: "grey",
      borderRadius: 5,
      borderWidth: 1,
    },
  });

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={ingredient}
        label="Ingrédients"
        onChangeText={(text) => {
          setIngredient(text);
        }}
        style={{ marginBottom: 20 }}
      />

      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
              <Image source={{ uri: item.food.image }} style={{ height: 60, width: 60, objectFit: "contain" }} />
              <View>
                <Text>{item.food.label}</Text>
                <Text>{item.food.categoryLabel}</Text>
              </View>
            </View>
            <Text style={{ flex: 1 }}>Total cal. : {item.food.nutrients.ENERC_KCAL}(kCal)</Text>
            <Pressable
              style={{
                backgroundColor: "rebeccapurple",
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 10,
              }}
              onPress={() => addIngredient(item)}
            >
              <Text style={{ color: "white" }}>+</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={ingredient ? <Text>Aucun résultat</Text> : null}
        style={{ marginBottom: 20, backgroundColor: "white", position: "absolute", zIndex: 1, width: "100%", left: 20, top: 90 }}
      />

      {ingredientAdded.length > 0 && (
        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5, marginTop: 15 }}>Ingrédients de la liste :</Text>
          {ingredientAdded.map((ingredient, index) => (
            <View key={index} style={styles.card}>
              <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
                <Image source={{ uri: ingredient.food.image }} style={{ height: 60, width: 60, objectFit: "contain" }} />
                <View>
                  <Text>{ingredient.food.label}</Text>
                  <Text>{ingredient.food.categoryLabel}</Text>
                </View>
              </View>
              <Text style={{ flex: 1 }}>Total cal. : {ingredient.food.nutrients.ENERC_KCAL}(kCal)</Text>
            </View>
          ))}
          <Button mode="contained" onPress={addRecipeToRecipes} style={{ marginBottom: 10 }}>
            Ajouter la recette
          </Button>
        </ScrollView>
      )}
    </View>
  );
};

export default add;
