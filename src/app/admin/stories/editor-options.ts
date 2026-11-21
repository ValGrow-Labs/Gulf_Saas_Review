import {
  sectionOptions,
  countryOptions,
  softwareOptions,
  listAuthors,
  listAvatars,
  listImages,
} from "@/lib/cms-options";
import type { EditorOptions } from "./StoryEditor";

export async function loadEditorOptions(): Promise<EditorOptions> {
  const [authors, avatars, images] = await Promise.all([listAuthors(), listAvatars(), listImages()]);
  return {
    sections: sectionOptions,
    countries: countryOptions,
    software: softwareOptions,
    authors,
    avatars,
    images,
  };
}
