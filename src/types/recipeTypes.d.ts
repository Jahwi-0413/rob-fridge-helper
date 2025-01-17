import { Timestamp } from "firebase/firestore";

export type TRecipe = {
  id: string;
  // 요리 이름
  name: string;
  // 필요한 재료
  ingredients: { name: string; amount: string }[];
  // 만드는 법
  directions: string[];
  // 등록일
  createdDate: Timestamp;
};
