import { loadModule } from "./load.ts";
import { Solution } from "./types.ts";

export async function validateDay(day: number, file: string) {
  const module: Solution = await loadModule(day);
  let text: string;
  try {
    text = Deno.readTextFileSync(file);
  } catch (error) {
    console.log("Error reading file: ", error.message);
    Deno.exit(1);
  }
  const valid = module.validate(text);
  if (!valid) {
    Deno.exit(1);
  }
}
