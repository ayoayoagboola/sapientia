'use server'


// mostly for testing 

import { promises as fs } from "fs";

export async function loadWordForms(filePath: string): Promise<WordFormsData> {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as WordFormsData;
}

