// Copyright (C) 2024 Wyden and Gyre, LLC
import { writeAll } from "jsr:@std/io@^0.225.2";
import { Progress } from "../lib/pipeline.ts";

export async function render(
  w: Deno.Writer,
  p: Progress,
): Promise<void> {
  const rendered = renderStr(p);
  const te = new TextEncoder();
  const bytes = te.encode(`\r${rendered}`);
  await writeAll(w, bytes);
}

function renderStr({ completed, total }: Progress): string {
  const COMPLETION_CHAR = "#";
  const TOTAL_CHARS = 50;

  const percentComplete = completed / total;
  const completionCharCount = Math.round(percentComplete * TOTAL_CHARS);
  const spaceCount = TOTAL_CHARS - completionCharCount;

  const completionChars = COMPLETION_CHAR.repeat(completionCharCount);
  const spaces = " ".repeat(spaceCount);
  return `[${completionChars}${spaces}] ${completed}/${total}`;
}
