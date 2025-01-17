import { db } from "@/firebase";
import dayjs from "dayjs";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
import Image from "next/image";

import fridgeImg from "../../../public/images/fridge.png";
import { Button } from "@/components/ui/button";
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

  // const onDelete = async (ingredientId: string) => {
  //   try {
  //     const ingreRef = doc(db, "ingredients", ingredientId);
  //     await deleteDoc(ingreRef);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <main>
      <menu className="flex flex-row justify-between mb-4">
        <li>
          <Button>레시피 검색</Button>
        </li>
        <li>
          <Link href="/ingredient">
            <Button>재료 추가</Button>
          </Link>
        </li>
      </menu>

      <div className="relative">
        <Image
          alt="냉장고 이미지"
          src={fridgeImg}
          width={320}
          className="mx-auto"
          data-credit="냉장고 클립 아트 PNG는 699pic에 의해 설계되었고,에서 유래되었다. https://kor.pngtree.com/freepng/refrigerator_5620739.html?sol=downref&id=bef"
        />
        {/* 냉동 */}
        <div className="h-[50%] w-[80%] absolute top-4 left-6 py-4 px-1">
          <h4 className="text-lg font-bold">냉동</h4>
          <ul className="h-[80%] mt-2flex flex-col gap-2 overflow-y-auto">
            {freezerIngredients.map((ingre) => (
              <li key={ingre.id} className="flex flex-row justify-between">
                <span>
                  <div>{ingre.name}</div>
                  <div className="text-xs text-gray-600">
                    {ingre.createdDate}
                  </div>
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
                  <div className="text-xs text-gray-600">
                    {ingre.createdDate}
                  </div>
                </span>
                <Link href={`/ingredient/${ingre.id}`}>
                  <EllipsisVerticalIcon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
