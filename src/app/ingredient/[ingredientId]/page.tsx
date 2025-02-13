import IngredientForm from "@/components/form/IngredientForm";
import { db } from "@/firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";

interface PIngredient {
  params: Promise<{
    ingredientId: string;
  }>;
}

export default async function Ingredient({ params }: PIngredient) {
  const ingredientId = (await params).ingredientId; // 배열 형태 처리

  const ingreRef = doc(db, "ingredients", ingredientId);
  const ingreDoc = await getDoc(ingreRef);

  // 404
  if (!ingreDoc.exists()) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-xl text-center font-bold mb-3">식재료 수정</h1>
      <IngredientForm
        mode="edit"
        data={{
          id: ingredientId,
          name: ingreDoc.data().name,
          createdDate: (ingreDoc.data().createdDate as Timestamp).toDate(),
          type: ingreDoc.data().type,
        }}
      />
    </>
  );
}
