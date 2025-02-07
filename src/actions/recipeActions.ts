"use server";

import { TRecipeForm } from "@/components/form/RecipeForm";
import { db } from "@/firebase";
import { TRecipeData } from "@/types/recipeTypes";
import {
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const recipeConverter = {
  // firestore에 저장할 때
  toFirestore: (data: TRecipeData) => ({
    ...data,
    createdDate: Timestamp.fromDate(new Date(data.createdDate)),
  }),
  // firestore에서 가져올 때
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    return {
      id: snap.id,
      name: snap.data().name,
      ingredients: snap.data().ingredients,
      directions: snap.data().directions,
      createdDate: snap.data().createdDate.toDate(),
    } as TRecipeData;
  },
};

// 레시피 목록 조회
export async function getRecipes(): Promise<TRecipeData[]> {
  const recipeSnapshot = await getDocs(
    collection(db, "recipes").withConverter(recipeConverter)
  );
  return recipeSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
}

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
