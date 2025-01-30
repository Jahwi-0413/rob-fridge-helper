import RecipeForm, { TRecipeForm } from "@/components/form/RecipeForm";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function RecipeCreate() {
  const defaultValue: TRecipeForm = {
    name: "",
    directions: [{ value: "" }],
    ingredients: [{ name: "", amount: "" }],
    createdDate: new Date(),
  };

  return (
    <>
      <Link href="/recipes" className="absolute">
        <MoveLeftIcon />
      </Link>
      <main className="flex flex-col justify-center gap-2">
        <h1 className="font-3xl text-center font-bold">레시피 추가</h1>
        <RecipeForm defaultValue={defaultValue} mode="create" />
      </main>
    </>
  );
}
