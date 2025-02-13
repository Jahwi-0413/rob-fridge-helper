import RecipeForm, { TRecipeForm } from "@/components/form/RecipeForm";
import { TRecipeData } from "@/types/recipeTypes";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface PRecipeEdit {
  params: Promise<{
    recipeId: string;
  }>;
}

export default async function RecipeEdit({ params }: PRecipeEdit) {
  const recipeId = (await params)?.recipeId;

  const recipeData: TRecipeData = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}`, {
      cache: "no-store",
    })
  ).json();

  console.log(recipeData)

  const formDefVal: TRecipeForm & { id: string } = {
    ...recipeData,
    directions: recipeData.directions.map((d) => ({ value: d })),
  };

  return (
    <>
      <Link href={`/recipes/${recipeId}`} className="absolute">
        <MoveLeftIcon />
      </Link>
      <main className="flex flex-col justify-center gap-2">
        <h1 className="text-xl text-center font-bold">레시피 추가</h1>
        <RecipeForm defaultValue={formDefVal} mode="edit" />
      </main>
    </>
  );
}
