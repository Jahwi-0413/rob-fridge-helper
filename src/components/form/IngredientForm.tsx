"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TIngredientData } from "@/types/ingredientTypes";
import { useRouter } from "next/navigation";
import {
  createIngredient,
  deleteIngredient,
  editIngredient,
} from "@/actions/ingredientActions";

const ingredientSchema = z.object({
  name: z.string().nonempty("이름을 입력해 주세요."),
  createdDate: z.string(),
  type: z.enum(["freezer", "room", "fridge"], {
    invalid_type_error: "타입을 설정해 주세요",
  }),
});

type PIngredientForm =
  | {
      mode: "create";
    }
  | {
      data: TIngredientData & { id: string };
      mode: "edit";
    };

export default function IngredientForm(props: PIngredientForm) {
  const router = useRouter();

  const form = useForm<TIngredientData>({
    resolver: zodResolver(ingredientSchema),
    defaultValues:
      props.mode === "create"
        ? {
            name: "",
            createdDate: "",
            type: "room",
          }
        : {
            name: props.data.name,
            createdDate: props.data.createdDate,
            type: props.data.type,
          },
  });
  const { control, handleSubmit, formState } = form;

  const onSubmit = async (data: z.infer<typeof ingredientSchema>) => {
    // 식재료 추가
    if (props.mode === "create") {
      try {
        await createIngredient({
          ...data,
        });
        form.reset();
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    try {
      await editIngredient({
        id: props.data.id,
        ...data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteIngredient(id);
      router.replace("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
      >
        {/* Name Field */}
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-[120px] border-slate-900 rounded-none"
                />
              )}
            />
          </FormControl>
          {formState.errors.name && (
            <FormMessage>{formState.errors.name.message}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>보관 장소</FormLabel>
          <FormControl>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[120px] rounded-none border-slate-900">
                    <SelectValue placeholder="보관 장소" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectGroup>
                      <SelectItem value="freezer">냉동</SelectItem>
                      <SelectItem value="fridge">냉장</SelectItem>
                      <SelectItem value="room">실온</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          {formState.errors.type && (
            <FormMessage>{formState.errors.type.message}</FormMessage>
          )}
        </FormItem>

        <Button
          type="submit"
          className="w-[60%] self-center"
          disabled={!formState.isValid}
        >
          {props.mode === "create" ? "추가" : "수정"}
        </Button>
        {props.mode === "edit" && (
          <Button
            type="button"
            variant={"destructive"}
            className="w-[60%] self-center"
            onClick={() => onDelete(props.data.id)}
          >
            삭제
          </Button>
        )}
      </form>
    </Form>
  );
}
