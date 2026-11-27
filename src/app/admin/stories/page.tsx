import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { readStories, byNewest } from "@/lib/news-store";
import { sectionLabel, countryLabel, shortDate, newsSections } from "@/lib/news";
import { setStatusAction } from "../actions";

type SP = Promise<{ [k: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

function href(params: Record<string, string>) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
  const s = qs.toString();
  return s ? `/admin/stories?${s}` : "/admin/stories";
}

export default async function StoriesAdmin({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const sp = await searchParams;
  const q = one(sp.q).trim();
  const status = one(sp.status);
  const section = one(sp.section);

  const all = (await readStories()).sort(byNewest);
  const counts = {
    all: all.length,
    published: all.filter((s) => s.status === "published").length,
    draft: all.filter((s) => s.status === "draft").length,
  };
  const needle = q.toLowerCase();
  const stories = all.filter(
    (s) =>
      (!status || s.status === status) &&
      (!section || s.categorySlug === section) &&
      (!needle ||
        s.title.toLowerCase().includes(needle) ||
        s.author.name.toLowerCase().includes(needle) ||
        s.tags.some((t) => t.toLowerCase().includes(needle)))
  );

  const tab = (value: string, label: string, n: number) => (
    <Link
      href={href({ q, section, status: value })}
      aria-current={status === value ? "page" : undefined}
      className="chip !min-h-8 !py-1 !text-[0.82rem]"
    >
      {label} <span className="num text-[0.72rem] opacity-70">{n}</span>
    </Link>
  );

  return (
    <div className="space-y-6">
      {one(sp.deleted) && (
        <p role="status" className="rounded-2xl bg-teal-soft px-4 py-3 text-[0.9rem] font-semibold text-teal">
          Story deleted. The public site has been updated.
        </p>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-[2.2rem]">Stories</h1>
          <p className="mt-1 text-[0.9rem] text-ink-3">
            {counts.published} published · {counts.draft} {counts.draft === 1 ? "draft" : "drafts"}
          </p>
        </div>
        <Link href="/admin/stories/new" className="btn btn-accent">
          + New story
        </Link>
      </div>

      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tab("", "All", counts.all)}
          {tab("published", "Published", counts.published)}
          {tab("draft", "Drafts", counts.draft)}
        </div>
        <form action="/admin/stories" className="flex flex-col gap-2 sm:flex-row">
          {status && <input type="hidden" name="status" value={status} />}
          <label className="sr-only" htmlFor="section">
            Section
          </label>
          <select id="section" name="section" defaultValue={section} className="field !min-h-10 !py-1.5 sm:w-44">
            <option value="">All sections</option>
            {newsSections.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="q">
            Search stories
          </label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Search title, author or tag" className="field !min-h-10 !py-1.5 sm:w-64" />
          <button type="submit" className="btn btn-primary btn-sm !min-h-10">
            Filter
          </button>
        </form>
      </div>

      {stories.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="h-card text-[1.3rem]">No stories match.</p>
          <p className="mt-1 text-[0.9rem] text-ink-3">Try a different search, or clear the filters.</p>
          <Link href="/admin/stories" className="btn btn-outline btn-sm mt-4">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-[0.88rem]">
              <thead className="bg-sand-soft font-mono text-[0.66rem] uppercase tracking-[0.07em] text-ink-2">
                <tr>
                  <th scope="col" className="px-4 py-3">Story</th>
                  <th scope="col" className="px-3 py-3">Section</th>
                  <th scope="col" className="px-3 py-3">Country</th>
                  <th scope="col" className="px-3 py-3">Date</th>
                  <th scope="col" className="px-3 py-3">Status</th>
                  <th scope="col" className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((s) => (
                  <tr key={s.id} className="border-t-[1.5px] border-dashed border-rule align-middle hover:bg-paper">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-paper-2">
                          <Image src={s.featuredImage} alt={s.title} fill sizes="56px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <Link href={`/admin/stories/${encodeURIComponent(s.id)}`} className="line-clamp-2 font-semibold hover:text-terracotta">
                            {s.title}
                          </Link>
                          <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[0.74rem] text-ink-3">
                            {s.author.name}
                            {s.isHeroFeatured && <span className="tag tag-accent !py-0">Lead</span>}
                            {s.trendingRank && <span className="tag tag-sand !py-0">Most read #{s.trendingRank}</span>}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink-2">{sectionLabel(s.categorySlug)}</td>
                    <td className="px-3 py-3 text-ink-2">{countryLabel(s.countryCode)}</td>
                    <td className="num px-3 py-3 text-[0.8rem] text-ink-2">{shortDate(s)}</td>
                    <td className="px-3 py-3">
                      <form action={setStatusAction} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="status" value={s.status === "published" ? "draft" : "published"} />
                        <span className={`tag ${s.status === "published" ? "tag-teal" : ""}`}>
                          {s.status === "published" ? "Published" : "Draft"}
                        </span>
                        <button type="submit" className="text-[0.76rem] font-semibold text-ink-3 underline-offset-2 hover:text-terracotta hover:underline">
                          {s.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <Link href={`/admin/stories/${encodeURIComponent(s.id)}`} className="btn btn-sm btn-primary !min-h-8 !px-3">
                          Edit
                        </Link>
                        <Link
                          href={`/news/${s.slug}`}
                          target="_blank"
                          className="btn btn-sm !min-h-8 !px-3 border-[1.5px] border-rule bg-surface hover:border-ink-3"
                        >
                          {s.status === "published" ? "View ↗" : "Preview ↗"}
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
