import { insertWordForm } from "@/actions/word";
import { db } from "@/db";
import { loadWordForms } from "@/utils/word-forms";

// TODO: not the cleanest... but it works? ;)

(async () => {
  // Connect to the database
  await db.$client.connect();

  try {
    console.log("Loading word forms...");
    const wordFormsData = await loadWordForms("./canis_word_forms.json"); // Update the path to your JSON file

    console.log("Inserting word forms into database...");
    await insertWordForm("canis", wordFormsData);

    console.log("Word forms successfully inserted!");
  } catch (error) {
    console.error("Error inserting word forms:", error);
  } finally {
    // Disconnect from the database
    await db.$client.end();
  }
})();
