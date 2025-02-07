import { Timestamp } from "firebase/firestore";

// firebase에서 가져올때 씌이는 값
export type TRecipeDoc = {
  id?: string;
  // 요리 이름
  name: string;
  // 필요한 재료
  ingredients: { name: string; amount: string }[];
  // 만드는 법
  directions: string[];
  // 등록일
  createdDate: Timestamp;
};

// UI에서 사용되는 값 형식
export type TRecipeData = {
  id: string;
  // 요리 이름
  name: string;
  // 필요한 재료
  ingredients: { name: string; amount: string }[];
  // 만드는 법
  directions: string[];
  // 등록일
  createdDate: Date;
};
