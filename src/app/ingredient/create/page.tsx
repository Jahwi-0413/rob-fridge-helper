import IngredientForm from "@/components/form/IngredientForm";

export default function IngredientCreate() {
  return (
    <>
      <h1 className="text-xl text-center font-bold mb-3">식재료 추가</h1>
      <IngredientForm mode="create" />
    </>
  );
}
