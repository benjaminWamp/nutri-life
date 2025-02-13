import { createContext, useContext, useState, ReactNode } from "react";

type RecipeContextType = {
  recipe: any[];
  setRecipe: React.Dispatch<React.SetStateAction<any[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipe, setRecipe] = useState<any[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
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
