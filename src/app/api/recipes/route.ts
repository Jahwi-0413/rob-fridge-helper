import { db } from "@/firebase";
import { TRecipeData } from "@/types/recipeTypes";
import { QueryDocumentSnapshot, Timestamp, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

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

export async function GET(): Promise<NextResponse<TRecipeData[]>> {
  const recipeDocs = await getDocs(
    collection(db, "recipes").withConverter(recipeConverter)
  );
  const recipes = recipeDocs.docs.map((doc) => ({
    ...doc.data(),
  }));
  return NextResponse.json(recipes);
}
