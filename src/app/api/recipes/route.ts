import { getRecipes } from "@/actions/recipeActions";
import { TRecipeData } from "@/types/recipeTypes";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<TRecipeData[]>> {
  const recipes = await getRecipes();
  return NextResponse.json(recipes);
}
