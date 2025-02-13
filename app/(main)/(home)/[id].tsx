import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useRecipe } from "../../../context/recipe";
import { Button } from "react-native-paper";

const detailMeat = () => {
  const { id } = useLocalSearchParams();
  const { recipe, deleteRecipe } = useRecipe();
  const recipeDetails = recipe[id];
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      paddingEnd: 10,
      overflow: "hidden",
    },
  });

  if (!recipeDetails) return <View />;

  return (
    <View style={{ padding: 20 }}>
      {recipeDetails?.totalKCal && (
        <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 26 }}>Total des calories : {recipeDetails.totalKCAL}(kCal)</Text>
      )}
      <FlatList
        data={recipeDetails.details}
        renderItem={({ item }) => (
          <View style={[styles.card, { flexDirection: "row", marginBottom: 5, width: "100%" }]}>
            <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
              <Image source={{ uri: item.food.image }} style={{ height: 60, width: 60, objectFit: "contain" }} />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "400" }}>{item.food.label}</Text>
                <Text>{item.food.categoryLabel}</Text>
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={{ flex: 1 }}>Total cal. : {item.food.nutrients.ENERC_KCAL}(kCal)</Text>
              <Text style={{ flex: 1 }}>Proteine :{item.food.nutrients.PROCNT}(kCal)</Text>
              <Text style={{ flex: 1 }}>Gras : {item.food.nutrients.FAT}(kCal)</Text>
              <Text style={{ flex: 1 }}>Glucide: : {item.food.nutrients.CHOCDF}(kCal)</Text>
              <Text style={{ flex: 1 }}>Lipide : {item.food.nutrients.FIBTG}(kCal)</Text>
            </View>
          </View>
        )}
      />
      <Button
        onPress={() => {
          deleteRecipe(id);
          router.push("/");
        }}
      >
        Supprimer la recette
      </Button>
    </View>
  );
};

export default detailMeat;
