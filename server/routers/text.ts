import { z } from "zod";

import { publicProcedure, router } from "@/server/trpc";

import { db } from "@/db";

import { and, eq, sql } from "drizzle-orm";
import { supabase } from "@/lib/supabase";

export const textRouter = router({
    getTextForms: publicProcedure
      .input(
        z.object({
          bucket: z.string(),
          prefix: z.string(), // The prefix for filtering text files (e.g., 'pro-quinctio-section-')
        })
      )
      .query(async ({ input }) => {
        const { bucket, prefix } = input;
  
        // Fetch all files in the bucket
        const { data, error } = await supabase.storage
          .from(bucket)
          .list(undefined, { limit: 1000 }); // No folder, fetch from the root of the bucket
  
        if (error) {
          console.error("Error fetching text sections:", error.message);
          return [];
        }
  
        // Filter files based on the prefix (e.g., 'pro-quinctio-section-')
        const relevantFiles = data
          .filter((file) => file.name.startsWith(prefix))
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name to ensure correct order
  
        const sections = [];
  
        for (const file of relevantFiles) {
          const { data: fileData, error: fileError } = await supabase.storage
            .from(bucket)
            .download(file.name);
          if (fileError) {
            console.error(`Error downloading ${file.name}:`, fileError.message);
            continue;
          }
  
          sections.push(await fileData.text());
        }
  
        return sections; // Array of sections in order
      }),
  });