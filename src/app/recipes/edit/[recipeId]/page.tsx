import RecipeForm, { TRecipeForm } from "@/components/form/RecipeForm";
import { db } from "@/firebase";
import { TRecipe } from "@/types/recipeTypes";
import { QueryDocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface PRecipeEdit {
  params: Promise<{
    recipeId: string;
  }>;
}

const converter = {
  toFirestore: (data: TRecipe) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TRecipe,
};

export default async function RecipeEdit({ params }: PRecipeEdit) {
  const recipeId = (await params)?.recipeId;

  const recipeDoc = await getDoc(
    doc(db, "recipes", recipeId).withConverter(converter)
  );

  if (recipeDoc.exists()) {
    const formDefVal: TRecipeForm & { id: string } = {
      id: recipeDoc.id,
      name: recipeDoc.data().name,
      ingredients: recipeDoc.data().ingredients,
      directions: recipeDoc.data().directions.map((d) => ({ value: d })),
      createdDate: recipeDoc.data().createdDate.toDate(),
    };

    return (
      <>
        <Link href="/recipes" className="absolute">
          <MoveLeftIcon />
        </Link>
        <main className="flex flex-col justify-center gap-2">
          <h1 className="font-3xl text-center font-bold">레시피 추가</h1>
          <RecipeForm defaultValue={formDefVal} mode="edit" />
        </main>
      </>
    );
  }
}
