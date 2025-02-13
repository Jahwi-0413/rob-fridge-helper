import { getRecipe } from "@/actions/recipeActions";
import RecipeForm, { TRecipeForm } from "@/components/form/RecipeForm";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface PRecipeEdit {
  params: Promise<{
    recipeId: string;
  }>;
}

export default async function RecipeEdit({ params }: PRecipeEdit) {
  const recipeId = (await params)?.recipeId;

  const recipeData = await getRecipe(recipeId);
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
