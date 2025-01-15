import IngredientForm from "@/components/form/IngredientForm";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import {
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

type TIngredient = {
  name: string;
  createdDate: Timestamp;
  type: "freezer" | "room" | "fridge";
};

const converter = {
  toFirestore: (data: TIngredient) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TIngredient,
};

interface PIngredient {
  params: Promise<{
    ingredientId: string[];
  }>;
}

export default async function Ingredient({ params }: PIngredient) {
  const ingredientId = (await params).ingredientId?.[0]; // 배열 형태 처리

  // 식재료 id가 없다면 생성 화면
  if (!ingredientId) {
    return (
      <>
        <Link href="/main" className="absolute">
          <MoveLeftIcon />
        </Link>
        <h1 className="font-3xl text-center font-bold mb-3">식재료 추가</h1>
        <IngredientForm mode="create" />;
      </>
    );
  }

  const ingredientsRef = collection(db, "ingredients").withConverter(converter);
  const ingredientsSnapshot = await getDocs(ingredientsRef);
  const ingredientDoc = ingredientsSnapshot.docs.find(
    (doc) => doc.id === ingredientId
  );

  const ingreRef = doc(db, "ingredients", ingredientId);
  const ingreDoc = await getDoc(ingreRef);

  // 404
  if (!ingreDoc.exists()) {
    return <></>;
  }

  return (
    <>
      <Link href="/main" className="absolute">
        <MoveLeftIcon className="absolute" />
      </Link>
      <h1 className="font-3xl text-center font-bold mb-3">식재료 수정</h1>
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
