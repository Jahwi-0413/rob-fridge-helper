import { db } from "@/firebase";
import dayjs from "dayjs";
import {
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";

import fridgeImg from "../../../public/images/fridge.png";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

type TIngredient = {
  name: string;
  createdDate: Timestamp;
  type: "freezer" | "room" | "fridge";
};

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
    <main>
      <menu className="flex flex-row justify-between mb-4">
        <li>
          <Button>레시피 검색</Button>
        </li>
        <li>
          <Button>재료 추가</Button>
        </li>
      </menu>

      <div className="relative">
        <Image
          alt="냉장고 이미지"
          src={fridgeImg}
          width={300}
          className="mx-auto"
        />
        {/* 냉동 */}
        <div className="h-[42%] w-[80%] absolute top-0 left-10 py-4 px-2">
          <h4 className="text-lg font-bold">냉동</h4>
          <ul className="mt-2 overflow-auto flex flex-col gap-2">
            {freezerIngredients.map((ingre) => (
              <li key={ingre.id} className="flex flex-row justify-between">
                <span>
                  <div>{ingre.name}</div>
                  <div className="text-xs text-gray-600">
                    {ingre.createdDate}
                  </div>
                </span>
                <Button variant={"ghost"}>
                  <EllipsisVerticalIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[48%] w-[80%] absolute top-[45%] left-10 py-4 px-2">
          <h4 className="text-lg font-bold">냉장</h4>
          <ul className="mt-2 overflow-auto flex flex-col gap-2">
            {notFreezerIngredients.map((ingre) => (
              <li key={ingre.id} className="flex flex-row justify-between">
                <span>
                  <div>{ingre.name}</div>
                  <div className="text-xs text-gray-600">
                    {ingre.createdDate}
                  </div>
                </span>
                <Button variant={"ghost"}>
                  <EllipsisVerticalIcon />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
