import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { TRecipeDoc } from "@/types/recipeTypes";
import { QueryDocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface PRecipe {
  params: Promise<{
    recipeId: string;
  }>;
}

const converter = {
  toFirestore: (data: TRecipeDoc) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TRecipeDoc,
};

export default async function Recipe({ params }: PRecipe) {
  const recipeId = (await params)?.recipeId;

  const recipeDoc = await getDoc(
    doc(db, "recipes", recipeId).withConverter(converter)
  );

  if (recipeDoc.exists()) {
    const recipeData = {
      id: recipeDoc.id,
      name: recipeDoc.data().name,
      ingredients: recipeDoc.data().ingredients,
      directions: recipeDoc.data().directions,
      createdDate: recipeDoc.data().createdDate.toDate(),
    };
    return (
      <>
        <Link href="/recipes" className="absolute">
          <MoveLeftIcon />
        </Link>
        <main className="flex flex-col justify-center gap-2">
          <h1 className="text-xl text-center font-bold">{recipeData.name}</h1>
          <label className="text-lg font-bold">재료</label>
          <ul>
            {recipeData.ingredients.map((ingre) => (
              <li key={`${ingre.name}-${ingre.amount}`}>
                &bull;&nbsp;&nbsp;{ingre.name} {ingre.amount}
              </li>
            ))}
          </ul>
          <label className="text-lg font-bold mt-4">순서</label>
          <ul>
            {recipeData.directions.map((d, index) => (
              <li key={`direction-${index}`}>&bull;&nbsp;&nbsp;{d}</li>
            ))}
          </ul>
          <Link
            href={`/recipes/edit/${recipeData.id}`}
            className="mt-4 self-center w-[60%]"
          >
            <Button className="w-[100%]">수정</Button>
          </Link>
          <Button variant={"destructive"} className="self-center w-[60%]">
            삭제
          </Button>
        </main>
      </>
    );
  }
}
