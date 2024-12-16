"use server";

import { supabase } from "@/lib/supabase";
// mostly for testing

import { promises as fs } from "fs";
import path from "path";

export async function loadWordForms(filePath: string): Promise<WordFormsData> {
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent) as WordFormsData;
}

function normalizeText(text: string): string {
  let normalized = text.trim();
  normalized = normalized.replace(/\n\s*\n+/g, "\n\n"); // Normalize blank lines
  return normalized;
}

function splitByHeadingsOrNewlines(text: string): string[] {
  const regex = /(?:^|\n)([IVXLCDM]+\.\s|Chapter\s\d+|Section\s\d+)/g; // Adjust regex for your needs
  const sections = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      sections.push(text.slice(lastIndex, match.index).trim());
    }
    lastIndex = match.index;
  }
  if (lastIndex < text.length) {
    sections.push(text.slice(lastIndex).trim());
  }
  return sections.filter((section) => section);
}

export async function splitAndUpload(filePath: string, bucketName: string) {
  try {
    const text = await fs.readFile(filePath, { encoding: "utf-8" });
    const normalizedText = normalizeText(text);
    const sections = splitByHeadingsOrNewlines(normalizedText);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const fileName = `${path.basename(filePath, ".txt")}-section-${
        i + 1
      }.txt`;
      const filePathInBucket = `${fileName}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePathInBucket, Buffer.from(section), { upsert: true });

      if (error) {
        console.error(`Failed to upload ${fileName}:`, error.message);
      } else {
        console.log(`Uploaded ${fileName}`);
      }
    }
  } catch (err) {
    console.error("Error splitting and uploading:", err);
  }
}
