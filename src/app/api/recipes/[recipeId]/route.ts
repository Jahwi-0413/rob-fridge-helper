import { db } from "@/firebase";
import { TRecipeData } from "@/types/recipeTypes";
import {
  QueryDocumentSnapshot,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
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

export async function GET(
  _: Request,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  const { recipeId } = await params;

  // id를 포함하지 않았거나 잘못된 형식으로 요청했을 경우
  if (!recipeId || typeof recipeId !== "string") {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const recipeDoc = await getDoc(
      doc(db, "recipes", recipeId).withConverter(recipeConverter)
    );

    if (!recipeDoc.exists()) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json({
      ...recipeDoc.data(),
    });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
