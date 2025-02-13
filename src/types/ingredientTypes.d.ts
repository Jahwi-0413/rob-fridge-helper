export type TIngredient = {
  id?: string;
  name: string;
  createdDate: Timestamp;
  type: "freezer" | "room" | "fridge";
};
