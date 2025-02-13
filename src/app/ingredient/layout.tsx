import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function IngredientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/main" className="absolute">
        <MoveLeftIcon className="absolute" />
      </Link>
      {children}
    </>
  );
}
