"use client";

import { TRecipeData } from "@/types/recipeTypes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";

export default function RecipeList() {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState<TRecipeData[]>([]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    console.log(searchText);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes${
        searchText.length > 0 ? `?name=${searchText}` : ""
      }`,
      {
        cache: "no-store",
      }
    )
      .then((res) => res.json())
      .then((data: TRecipeData[]) => {
        setRecipes(data);
      });
  }, [searchText]);

  return (
    <>
      <Input
        type="search"
        className="border-slate-900  rounded-none"
        value={searchText}
        onChange={onChangeSearch}
      />

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
    </>
  );
}
