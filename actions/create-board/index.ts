"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    }
  }

  //will be validated at this point as will be wrapped in createSafeAction
  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      }
    })
  } catch (error) {
    return {
      error: "Failed to create",
    }
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const createBoard = createSafeAction(CreateBoard, handler);