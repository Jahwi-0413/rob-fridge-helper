import RecipeList from "@/components/features/RecipeList";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function Recipes() {
  return (
    <>
      <Link href="/main" className="absolute">
        <MoveLeftIcon />
      </Link>
      <main className="flex flex-col justify-center gap-2">
        <h1 className="text-xl text-center font-bold">레시피</h1>
        <RecipeList />
        <Link
          href="/recipes/create"
          className="absolute bottom-6 w-[80%] text-center"
        >
          <Button variant={"link"}>레시피 추가</Button>
        </Link>
      </main>
    </>
  );
}
