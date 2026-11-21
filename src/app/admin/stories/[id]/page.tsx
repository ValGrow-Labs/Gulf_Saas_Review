import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { readStories } from "@/lib/news-store";
import StoryEditor from "../StoryEditor";
import { loadEditorOptions } from "../editor-options";

type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default async function EditStoryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SP }) {
  await requireAdmin();
  const { id } = await params;
  const sp = await searchParams;
  const story = (await readStories()).find((s) => s.id === decodeURIComponent(id));
  if (!story) notFound();

  const saved = sp.saved === "published" || sp.saved === "draft" ? sp.saved : undefined;
  const notice = sp.needsText ? "needsText" : saved;

  // `key` resets the editor's local state when switching between stories.
  return <StoryEditor key={`${story.id}-${story.updatedAt}`} story={story} options={await loadEditorOptions()} notice={notice} />;
}
