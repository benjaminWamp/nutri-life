import { Text, View, Image, FlatList } from "react-native";
import { useRecipe } from "../../../context/recipe";

export default function Page() {
  const { recipe } = useRecipe();
  console.log(recipe);
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={recipe}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <Text>{JSON.stringify(item)}</Text>
            {item.details ??
              item.details.map((detail, i) => (
                <View key={i}>
                  <Image source={{ uri: detail.food.image }} />
                  <Text>{detail.food.label}</Text>
                </View>
              ))}
          </View>
        )}
      />

      {/* {recipe &&
        Array.isArray(recipe) &&
        recipe.map((r, i) => (
          <View key={i}>
            <Text>Recette {i + 1}</Text>
            {r.ingredients.map((ingredient, j) => (
              <View key={j}>
                <Image source={{ uri: ingredient.image }} />
                <Text>{ingredient.name}</Text>
                <Text>{ingredient.quantity}</Text>
              </View>
            ))}
          </View>
        ))} */}
    </View>
  );
}
