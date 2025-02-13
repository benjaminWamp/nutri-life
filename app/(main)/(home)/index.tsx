import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { useRecipe } from "../../../context/recipe";
import { Link } from "expo-router";

export default function Page() {
  const { recipe } = useRecipe();
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      paddingEnd: 10,
      overflow: "hidden",
      marginBottom: 10,
    },
  });
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={recipe}
        renderItem={({ item, index }) => (
          <Link style={[styles.card, { padding: 20 }]} href={`${index}`}>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5 }}>Recette {index + 1}</Text>
            <Text style={{ marginBottom: 5 }}>Total des calories : {item.totalKCAL}</Text>
            <FlatList
              data={item.details}
              renderItem={({ item, i }) => (
                <View key={i} style={[styles.card, { flexDirection: "row", marginBottom: 5, width: "100%" }]}>
                  <Image source={{ uri: item.food.image }} style={{ width: 100, height: 100 }} />
                  <Text>{item.food.label}</Text>
                </View>
              )}
            />
          </Link>
        )}
      />
    </View>
  );
}
