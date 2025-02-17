import { db } from "@/firebase";
import { TIngredientData } from "@/types/ingredientTypes";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";

// 식재료 생성
export async function createIngredient(
  data: Omit<TIngredientData, "createdDate">
) {
  try {
    await addDoc(collection(db, "ingredients"), {
      ...data,
      createdDate: Timestamp.now(),
    });
  } catch {
    throw new Error("식재료를 저장할 수 없습니다.");
  }
}

// 식재료 수정
export async function editIngredient(data: TIngredientData & { id: string }) {
  try {
    // 식재료 수정
    const ingreRef = doc(db, "ingredients", data.id);
    await setDoc(ingreRef, {
      ...data,
      createdDate: Timestamp.fromDate(new Date(data.createdDate)),
    });
  } catch {
    throw new Error("식재료를 수정할 수 없습니다.");
  }
}

// 식재료
