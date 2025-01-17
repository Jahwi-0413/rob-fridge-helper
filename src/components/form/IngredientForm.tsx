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
import { db } from "@/firebase";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { TIngredient } from "@/types/ingredientTypes";
import { useRouter } from "next/navigation";

const ingredientSchema = z.object({
  name: z.string().nonempty("이름을 입력해 주세요."),
  createdDate: z.date(),
  type: z.enum(["freezer", "room", "fridge"], {
    invalid_type_error: "타입을 설정해 주세요",
  }),
});

type PIngredientForm =
  | {
      mode: "create";
    }
  | {
      data: TIngredient & { id: string };
      mode: "edit";
    };

export default function IngredientForm(props: PIngredientForm) {
  const router = useRouter();

  const form = useForm<TIngredient>({
    resolver: zodResolver(ingredientSchema),
    defaultValues:
      props.mode === "create"
        ? {
            name: "",
            createdDate: new Date(),
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
        await addDoc(collection(db, "ingredients"), {
          ...data,
          createdDate: Timestamp.now(),
        });
        form.reset();
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    try {
      // 식재료 수정
      const ingreRef = doc(db, "ingredients", props.data.id);
      await setDoc(ingreRef, {
        ...data,
        createdDate: Timestamp.fromDate(props.data.createdDate),
      });
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
                  className="w-[120px]"
                  placeholder="식재료 이름 입력"
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
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="보관 장소" />
                  </SelectTrigger>
                  <SelectContent>
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

        <Button type="submit" className="w-[60%] self-center ">
          {props.mode === "create" ? "추가" : "수정"}
        </Button>
        {props.mode === "edit" && (
          <Button
            type="button"
            variant={"destructive"}
            className="w-[60%] self-center"
          >
            삭제
          </Button>
        )}
      </form>
    </Form>
  );
}
