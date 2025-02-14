import IngredientForm from "@/components/form/IngredientForm";

interface PIngredient {
  params: Promise<{
    ingredientId: string;
  }>;
}

export default async function Ingredient({ params }: PIngredient) {
  const ingredientId = (await params).ingredientId; // 배열 형태 처리

  const ingredient = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ingredients/${ingredientId}`
    )
  ).json();

  return (
    <>
      <h1 className="text-xl text-center font-bold mb-3">식재료 수정</h1>
      <IngredientForm mode="edit" data={ingredient} />
    </>
  );
}
