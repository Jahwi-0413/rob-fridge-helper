import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import fridgeImg from "../../../public/images/fridge.png";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <menu className="flex flex-row justify-between mb-4">
        <li>
          <Link href="/recipes">
            <Button variant={"link"}>레시피 검색</Button>
          </Link>
        </li>
        <li>
          <Link href="/ingredient/create">
            <Button variant={"link"}>재료 추가</Button>
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
        {children}
      </div>
    </main>
  );
}
