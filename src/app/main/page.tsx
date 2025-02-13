import { db } from "@/firebase";
import dayjs from "dayjs";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
import { EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";
import { TIngredient } from "@/types/ingredientTypes";

const converter = {
  toFirestore: (data: TIngredient) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as TIngredient,
};

export default async function Fridge() {
  const ingredientsRef = collection(db, "ingredients").withConverter(converter);
  const ingredientsSnapshot = await getDocs(ingredientsRef);
  const ingredients = ingredientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdDate: dayjs(doc.data().createdDate.toDate()).format(
      "YYYY.MM.DD HH:mm"
    ),
  }));

  // 냉동 재료
  const freezerIngredients = ingredients.filter(
    (ingre) => ingre.type === "freezer"
  );
  // 냉장 + 실온
  const notFreezerIngredients = ingredients.filter(
    (ingre) => ingre.type !== "freezer"
  );

  return (
    <>
      {/* 냉동 */}
      <div className="h-[50%] w-[80%] absolute top-4 left-6 py-4 px-1">
        <h4 className="text-lg font-bold">냉동</h4>
        <ul className="h-[80%] mt-2flex flex-col gap-2 overflow-y-auto">
          {freezerIngredients.map((ingre) => (
            <li key={ingre.id} className="flex flex-row justify-between">
              <span>
                <div>{ingre.name}</div>
                <div className="text-xs text-gray-600">{ingre.createdDate}</div>
              </span>
              <div>
                <Link href={`/ingredient/${ingre.id}`}>
                  <EllipsisVerticalIcon />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[44%] w-[80%] absolute top-[54%] left-6 py-4 px-1">
        <h4 className="text-lg font-bold">냉장</h4>
        <ul className="h-[80%] mt-2 flex flex-col gap-2 overflow-y-auto">
          {notFreezerIngredients.map((ingre) => (
            <li key={ingre.id} className="flex flex-row justify-between">
              <span>
                <div>{ingre.name}</div>
                <div className="text-xs text-gray-600">{ingre.createdDate}</div>
              </span>
              <Link href={`/ingredient/${ingre.id}`}>
                <EllipsisVerticalIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
