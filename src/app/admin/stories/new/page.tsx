import { requireAdmin } from "@/lib/admin-auth";
import StoryEditor from "../StoryEditor";
import { loadEditorOptions } from "../editor-options";

export default async function NewStoryPage() {
  await requireAdmin();
  return <StoryEditor options={await loadEditorOptions()} />;
}
