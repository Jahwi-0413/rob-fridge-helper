import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { TRecipe } from "@/types/recipeTypes";
import dayjs from "dayjs";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

const converter = {
  toFirestore: (data: TRecipe) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TRecipe,
};

export default async function Recipes() {
  const recipeSnapshot = await getDocs(
    collection(db, "recipes").withConverter(converter)
  );
  const recipes = recipeSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdDate: dayjs(doc.data().createdDate.toDate()).format(
      "YYYY.MM.DD HH:mm"
    ),
  }));

  return (
    <>
      <Link href="/main" className="absolute">
        <MoveLeftIcon />
      </Link>
      <main className="flex flex-col justify-center gap-2">
        <h1 className="text-xl text-center font-bold">레시피</h1>
        <Input type="search" className="border-slate-900  rounded-none" />
        <ul className="mt-4 flex flex-col gap-4">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Card className="bg-transparent border-slate-900 rounded-none">
                <CardHeader>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="underline underline-offset-4"
                  >
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <ul>
                    {recipe.ingredients.map((ingre) => (
                      <li key={`ingre-${ingre.name}-${ingre.amount}`}>
                        &bull; {ingre.name} {ingre.amount}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
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
