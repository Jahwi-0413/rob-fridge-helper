import { db } from "@/firebase";
import { TRecipeData } from "@/types/recipeTypes";
import {
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(
  req: NextRequest
): Promise<NextResponse<TRecipeData[]>> {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  const recipeDocs = await getDocs(
    collection(db, "recipes").withConverter(recipeConverter)
  );
  const recipes = recipeDocs.docs.map((doc) => ({
    ...doc.data(),
  }));

  // 레시피 이름 조회 (firestore는 문자열 포함 검색이 안됨)
  if (name) {
    return NextResponse.json(
      recipeDocs.docs
        .map((doc) => ({
          ...doc.data(),
        }))
        .filter((data) => data.name.indexOf(name) !== -1)
    );
  }

  return NextResponse.json(recipes);
}
