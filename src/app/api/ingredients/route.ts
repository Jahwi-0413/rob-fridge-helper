import { db } from "@/firebase";
import { TIngredientData, TIngredientDoc } from "@/types/ingredientTypes";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

const ingredientConverter = {
  toFirestore: (data: TIngredientDoc) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TIngredientDoc,
};

// 재료 목록 가져오기
export async function GET(): Promise<NextResponse<TIngredientData[]>> {
  const ingresRef = collection(db, "ingredients").withConverter(
    ingredientConverter
  );
  const ingreDocs = await getDocs(ingresRef);
  const ingredients = ingreDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdDate: dayjs(doc.data().createdDate.toDate()).format(
      "YYYY.MM.DD HH:mm"
    ),
  }));
  return NextResponse.json(ingredients);
}
