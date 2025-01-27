"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Fragment } from "react";
import { Button } from "../ui/button";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const ingredientsSchema = z.object({
  name: z.string().nonempty("재료 이름을 입력해 주세요."),
  amount: z.string(),
});

const directionSchema = z.object({
  value: z.string().nonempty(),
});

const recipeSchema = z.object({
  name: z.string().nonempty("레시피 이름을 입력해 주세요."),
  ingredients: z.array(ingredientsSchema).nonempty("재료를 입력해 주세요."),
  directions: z.array(directionSchema).nonempty("순서를 입력해 주세요."),
});

export type TRecipeForm = z.infer<typeof recipeSchema>;

type PRecipeForm = {
  defaultValue: TRecipeForm;
  mode: "create" | "edit";
};

export default function RecipeForm({ defaultValue, mode }: PRecipeForm) {
  const form = useForm<TRecipeForm>({
    defaultValues: defaultValue,
    resolver: zodResolver(recipeSchema),
  });
  const { control, handleSubmit, formState, register } = form;

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray<TRecipeForm>({
    control,
    name: "ingredients",
  });

  const {
    fields: directionFields,
    append: appendDirection,
    remove: removeDirection,
  } = useFieldArray<TRecipeForm>({
    control,
    name: "directions",
  });

  const createSubmit = async (data: TRecipeForm) => {
    console.log(data);
  };
  const editSubmit = async (data: TRecipeForm) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(mode === "create" ? createSubmit : editSubmit)}
        className="flex flex-col justify-center gap-6"
      >
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} className="border-slate-900 rounded-none" />
              )}
            />
          </FormControl>
          {formState.errors.name && (
            <FormMessage>{formState.errors.name?.message}</FormMessage>
          )}
        </FormItem>
        <FormItem>
          <FormLabel>재료</FormLabel>
          <Controller
            name="ingredients"
            control={control}
            render={() => (
              <div className="grid grid-cols-[1fr_1fr_.5fr_.5fr] gap-2">
                <FormLabel className="text-xs">이름</FormLabel>
                <FormLabel className="text-xs">양</FormLabel>
                <span></span>
                <span></span>
                {ingredientFields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Input
                      className="border-slate-900 rounded-none"
                      {...register(`ingredients.${index}.name` as const)}
                    />
                    <Input
                      className="border-slate-900 rounded-none"
                      {...register(`ingredients.${index}.amount` as const)}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        appendIngredient({ name: "", amount: "" });
                      }}
                    >
                      <PlusCircleIcon />
                    </Button>
                    <Button
                      type="button"
                      variant={"destructive"}
                      size="sm"
                      disabled={ingredientFields.length === 1}
                      onClick={() => {
                        removeIngredient(index);
                      }}
                    >
                      <MinusCircleIcon />
                    </Button>
                  </Fragment>
                ))}
              </div>
            )}
          />
        </FormItem>
        <FormItem>
          <FormLabel>순서</FormLabel>
          <Controller
            name="directions"
            control={control}
            render={() => (
              <div className="grid grid-cols-[2fr_.5fr_.5fr] gap-2">
                {directionFields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Input
                      className="border-slate-900 rounded-none"
                      {...register(`directions.${index}.value` as const)}
                    />

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        appendDirection({ value: "" });
                      }}
                    >
                      <PlusCircleIcon />
                    </Button>
                    <Button
                      type="button"
                      variant={"destructive"}
                      size="sm"
                      disabled={directionFields.length === 1}
                      onClick={() => {
                        removeDirection(index);
                      }}
                    >
                      <MinusCircleIcon />
                    </Button>
                  </Fragment>
                ))}
              </div>
            )}
          />
        </FormItem>
        <Button type="submit" className="w-[60%] self-center">
          {mode === "create" ? "추가" : "수정"}
        </Button>
      </form>
    </Form>
  );
}
