import { Timestamp } from "firebase/firestore";

// firestore에서 다루는 식재료 doc type
export type TIngredientDoc = {
  id?: string;
  name: string;
  createdDate: Timestamp;
  type: "freezer" | "room" | "fridge";
};

// UI에서 사용하는 식재료 data type
export type TIngredientData = {
  id?: string;
  name: string;
  createdDate: string;
  type: "freezer" | "room" | "fridge";
};
