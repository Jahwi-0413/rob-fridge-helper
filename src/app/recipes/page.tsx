import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TRecipe } from "@/types/recipeTypes";
import { Timestamp } from "firebase/firestore";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Recipes() {
  const recipes: TRecipe[] = [
    {
      id: "1",
      name: "참치마요우동",
      createdDate: Timestamp.now(),
      directions: [
        "끓는물에 우동 사리를 1분 데친다",
        "참치, 마요네즈, 간장, 참기름을 섞은 후 우동과 섞어준다",
        "김가루를 뿌린다",
      ],
      ingredients: [
        { name: "우동", amount: "1개" },
        { name: "참치캔", amount: "반 개" },
        { name: "마요네즈", amount: "2 큰술" },
        { name: "간장", amount: "1 큰술" },
        { name: "참기름", amount: "1 큰술" },
        { name: "김가루", amount: "약간" },
      ],
    },
  ];

  return (
    <>
      <Link href="/main" className="absolute">
        <MoveLeftIcon />
      </Link>
      <main className="flex flex-col justify-center gap-2 h-">
        <h1 className="font-3xl text-center font-bold">레시피</h1>
        <Input type="search" className="border-slate-900  rounded-none" />
        <ul className="mt-4 flex flex-col gap-4">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Card className="bg-transparent border-slate-900 rounded-none">
                <CardHeader>
                  <Link href={"#"} className="underline underline-offset-4">
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <ul>
                    {recipe.ingredients.map((ingre) => (
                      <li key={ingre.name}>
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
