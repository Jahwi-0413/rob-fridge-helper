import { db } from "@/firebase";
import { TIngredient } from "@/types/ingredientTypes";
import { Timestamp, addDoc, collection } from "firebase/firestore";

// 식재료 생성
export async function createIngredient(data: TIngredient) {
  try {
    await addDoc(collection(db, "ingredients"), {
      ...data,
      createdDate: Timestamp.now(),
    });
  } catch {
    throw new Error("식재료를 저장할 수 없습니다.");
  }
}
