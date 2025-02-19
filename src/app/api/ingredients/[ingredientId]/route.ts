import { db } from "@/firebase";
import { TIngredientDoc } from "@/types/ingredientTypes";
import { QueryDocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const ingredientConverter = {
  toFirestore: (data: TIngredientDoc) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TIngredientDoc,
};

export async function GET(
  _: Request,
  { params }: { params: Promise<{ ingredientId: string }> }
) {
  const { ingredientId } = await params;

  // id를 포함하지 않았거나 잘못된 형식으로 요청했을 경우
  if (!ingredientId || typeof ingredientId !== "string") {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const recipeDoc = await getDoc(
      doc(db, "ingredients", ingredientId).withConverter(ingredientConverter)
    );

    if (!recipeDoc.exists()) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json({
      ...recipeDoc.data(),
      createdDate: recipeDoc.data().createdDate.toDate(),
    });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
