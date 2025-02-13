import { Button } from "@/components/ui/button";
import { TRecipeData } from "@/types/recipeTypes";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

interface PRecipe {
  params: Promise<{
    recipeId: string;
  }>;
}

export default async function Recipe({ params }: PRecipe) {
  const recipeId = (await params)?.recipeId;

  const recipeData: TRecipeData = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}`, {
      cache: "no-store",
    })
  ).json();

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
