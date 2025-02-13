import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RecipeContextType = {
  recipe: any[];
  addRecipe: (item: any) => void;
  deleteRecipe: (id: number) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipe, setRecipe] = useState<any[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("recipes");
        if (storedRecipes) {
          setRecipe(JSON.parse(storedRecipes));
        }
      } catch (error) {
        console.error("Failed to load recipes from storage", error);
      }
    };

    loadRecipes();
  }, []);

  const addRecipe = async (item: any) => {
    const updatedRecipes = [...recipe, item];
    setRecipe(updatedRecipes);
    try {
      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    } catch (error) {
      console.error("Failed to save recipe to storage", error);
    }
  };

  const deleteRecipe = async (index: number) => {
    const updatedRecipes = recipe.filter((_, i) => i != index);
    console.log("updatedRecipes", updatedRecipes);

    setRecipe(updatedRecipes);
    try {
      await AsyncStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    } catch (error) {
      console.error("Failed to remove meal from storage", error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        addRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};
