import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-12 h-[70vh] w-[100%]">
      <h1 className="text-5xl text-center">
        냉털 <br />
        도우미
      </h1>
      <Link href="/main">
        <Button variant={"link"} className="text-2xl">
          Click
        </Button>
      </Link>
    </main>
  );
}
