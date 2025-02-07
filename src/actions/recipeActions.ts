"use server";

import { TRecipeForm } from "@/components/form/RecipeForm";
import { db } from "@/firebase";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";

// 레시피 등록
export async function createRecipe(data: TRecipeForm) {
  try {
    await addDoc(collection(db, "recipes"), {
      ...data,
      ingredients: data.ingredients.map((ingre) => ({
        name: ingre.name.trim(),
        amount: ingre.amount.trim(),
      })),
      // useFieldArray 쓰려고 만든 {value : string}[]을 string[]으로 바꾼다.
      directions: data.directions.map((d) => d.value.trim()),
      createdDate: Timestamp.now(),
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: "레시피를 등록하지 못했습니다." };
  }
}

// 레시피 수정
export async function editRecipe(recipeId: string, data: TRecipeForm) {
  try {
    const recipeRef = doc(db, "recipes", recipeId);
    await setDoc(recipeRef, {
      ...data,
      directions: data.directions.map((d) => d.value),
    });
    return { success: true };
  } catch (err) {
    return { success: false, message: "레시피를 수정하지 못했습니다." };
  }
}
