"use client";

import { useActionState, useEffect, useMemo, useRef, useState, startTransition } from "react";
import Link from "next/link";
import { saveStoryAction, deleteStoryAction, type StoryFormState } from "../actions";
import type { StoredStory } from "@/lib/news-store";

type Option = { value: string; label: string };
type Author = { name: string; role: string; avatar: string };

export interface EditorOptions {
  sections: Option[];
  countries: Option[];
  software: Option[];
  authors: Author[];
  avatars: string[];
  images: string[];
}

interface Props {
  story?: StoredStory;
  options: EditorOptions;
  notice?: "published" | "draft" | "needsText";
}

const today = () => new Date().toISOString().slice(0, 10);
const wordCount = (t: string) => t.split(/\s+/).filter(Boolean).length;

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.82rem] font-semibold text-terracotta">
      {msg}
    </p>
  );
}

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[0.88rem] font-semibold text-ink">{children}</span>
      {hint && <span className="ml-2 text-[0.78rem] text-ink-3">{hint}</span>}
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-3">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

export default function StoryEditor({ story, options, notice }: Props) {
  const [state, formAction, pending] = useActionState<StoryFormState, FormData>(saveStoryAction, {});
  const e = state.errors ?? {};
  const err = (k: string) => (e[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {});
  const errCls = (k: string) => (e[k] ? "!border-terracotta bg-terracotta-soft/30" : "");

  const [title, setTitle] = useState(story?.title ?? "");
  const [content, setContent] = useState((story?.content ?? []).join("\n\n"));
  const [subs, setSubs] = useState(
    (story?.subheadings ?? []).map((s) => ({ title: s.title, body: s.paragraphs.join("\n\n") }))
  );
  const [author, setAuthor] = useState(story?.author.name ?? options.authors[0]?.name ?? "__new");
  const [image, setImage] = useState(story?.featuredImage ?? options.images[0] ?? "");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
  }, [uploadPreview]);

  // Move focus to the error summary when a save fails, so screen-reader and keyboard users notice.
  useEffect(() => {
    if (state.message) summaryRef.current?.focus();
  }, [state]);

  const words = useMemo(
    () => wordCount(content) + subs.reduce((n, s) => n + wordCount(s.body), 0),
    [content, subs]
  );
  const minutes = Math.max(2, Math.round(words / 200));
  const isNew = !story;
  const isPublished = story?.status === "published";

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const submitter = (ev.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const fd = new FormData(ev.currentTarget);
    fd.set("intent", submitter?.value === "publish" ? "publish" : "draft");
    // Dispatch manually (not via the form `action` prop) so React doesn't reset the fields after submit.
    startTransition(() => formAction(fd));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/stories" className="text-[0.85rem] font-semibold text-ink-3 hover:text-terracotta">
            ← All stories
          </Link>
          <h1 className="display mt-1 text-[2rem]">{isNew ? "New story" : "Edit story"}</h1>
        </div>
        {story && (
          <span className={`tag ${isPublished ? "tag-teal" : ""}`}>{isPublished ? "Published" : "Draft"}</span>
        )}
      </div>

      {notice === "published" && (
        <p role="status" className="rounded-2xl bg-teal-soft px-4 py-3 text-[0.9rem] font-semibold text-teal">
          Published. The front page and news section now show this story.{" "}
          <Link href={`/news/${story?.slug}`} target="_blank" className="underline">
            View it ↗
          </Link>
        </p>
      )}
      {notice === "draft" && (
        <p role="status" className="rounded-2xl bg-sand-soft px-4 py-3 text-[0.9rem] font-semibold text-ink">
          Draft saved. It is not visible on the public site.
        </p>
      )}
      {notice === "needsText" && (
        <p role="status" className="rounded-2xl bg-terracotta-soft px-4 py-3 text-[0.9rem] font-semibold text-terracotta-deep">
          Add the story text before publishing.
        </p>
      )}
      {state.message && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl bg-terracotta-soft px-4 py-3 text-[0.9rem] text-terracotta-deep outline-none"
        >
          <p className="font-semibold">{state.message}</p>
          {state.errors && (
            <ul className="mt-1 list-disc pl-5">
              {Object.entries(state.errors).map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]" noValidate>
        {story && <input type="hidden" name="id" value={story.id} />}

        {/* ---------------------------------------------------------------- main column */}
        <div className="space-y-5">
          <section className="card space-y-5 p-5 sm:p-6">
            <div>
              <Label htmlFor="title">Headline</Label>
              <input
                id="title"
                name="title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                className={`field mt-1.5 !text-[1.2rem] font-semibold ${errCls("title")}`}
                placeholder="e.g. UAE e-invoicing: what finance teams should prepare now"
                {...err("title")}
              />
              <FieldError id="title-error" msg={e.title} />
            </div>
            <div>
              <Label htmlFor="slug" hint="Leave blank to build it from the headline">
                Web address
              </Label>
              <div className={`mt-1.5 flex items-center rounded-[14px] border-[1.5px] border-rule bg-surface pl-3 ${errCls("slug")}`}>
                <span className="shrink-0 text-[0.86rem] text-ink-3">/news/</span>
                <input
                  id="slug"
                  name="slug"
                  defaultValue={story?.slug ?? ""}
                  className="min-h-[46px] w-full bg-transparent px-1 text-[0.92rem] focus:outline-none"
                  placeholder="uae-e-invoicing-what-to-prepare"
                  {...err("slug")}
                />
              </div>
              <FieldError id="slug-error" msg={e.slug} />
              {!isNew && isPublished && (
                <p className="mt-1 text-[0.76rem] text-ink-3">Changing the address of a published story breaks links already shared.</p>
              )}
            </div>
            <div>
              <Label htmlFor="subtitle" hint="One sentence under the headline">
                Standfirst
              </Label>
              <textarea id="subtitle" name="subtitle" rows={2} defaultValue={story?.subtitle ?? ""} className="field mt-1.5" />
            </div>
            <div>
              <Label htmlFor="excerpt" hint="Shown in lists, search and social previews">
                Summary
              </Label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                defaultValue={story?.excerpt ?? ""}
                className={`field mt-1.5 ${errCls("excerpt")}`}
                {...err("excerpt")}
              />
              <FieldError id="excerpt-error" msg={e.excerpt} />
            </div>
          </section>

          <section className="card space-y-5 p-5 sm:p-6">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor="content" hint="Separate paragraphs with a blank line">
                  Story text
                </Label>
                <span className="num text-[0.74rem] text-ink-3">
                  {words} words · {minutes} min read
                </span>
              </div>
              <textarea
                id="content"
                name="content"
                rows={14}
                value={content}
                onChange={(ev) => setContent(ev.target.value)}
                className={`field mt-1.5 font-[inherit] leading-relaxed ${errCls("content")}`}
                {...err("content")}
              />
              <FieldError id="content-error" msg={e.content} />
            </div>

            <fieldset>
              <legend className="text-[0.88rem] font-semibold">
                Sections with subheadings <span className="ml-2 text-[0.78rem] font-normal text-ink-3">Optional, shown after the main text</span>
              </legend>
              <div className="mt-2 space-y-3">
                {subs.map((sub, i) => (
                  <div key={i} className="rounded-2xl bg-paper-2 p-3">
                    <div className="flex items-center gap-2">
                      <label className="sr-only" htmlFor={`subt-${i}`}>
                        Section {i + 1} heading
                      </label>
                      <input
                        id={`subt-${i}`}
                        name="subheadingTitle"
                        value={sub.title}
                        onChange={(ev) => setSubs((p) => p.map((s, k) => (k === i ? { ...s, title: ev.target.value } : s)))}
                        placeholder={`Section ${i + 1} heading`}
                        className="field !min-h-10 font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setSubs((p) => p.filter((_, k) => k !== i))}
                        className="h-10 shrink-0 rounded-full px-3 text-[0.8rem] font-semibold text-ink-3 hover:bg-terracotta-soft hover:text-terracotta-deep"
                        aria-label={`Remove section ${i + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                    <label className="sr-only" htmlFor={`subb-${i}`}>
                      Section {i + 1} text
                    </label>
                    <textarea
                      id={`subb-${i}`}
                      name="subheadingBody"
                      rows={4}
                      value={sub.body}
                      onChange={(ev) => setSubs((p) => p.map((s, k) => (k === i ? { ...s, body: ev.target.value } : s)))}
                      className="field mt-2"
                      placeholder="Section text. Separate paragraphs with a blank line."
                    />
                  </div>
                ))}
              </div>
              <FieldError id="subheadings-error" msg={e.subheadings} />
              <button
                type="button"
                onClick={() => setSubs((p) => [...p, { title: "", body: "" }])}
                className="btn btn-sm mt-3 border-[1.5px] border-dashed border-rule bg-surface hover:border-ink-3"
              >
                + Add a section
              </button>
            </fieldset>

            <div>
              <Label htmlFor="keyTakeaways" hint="One per line, up to 6">
                Key takeaways
              </Label>
              <textarea
                id="keyTakeaways"
                name="keyTakeaways"
                rows={4}
                defaultValue={(story?.keyTakeaways ?? []).join("\n")}
                className="field mt-1.5"
              />
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- sidebar */}
        <aside className="space-y-5">
          <section className="card p-5 lg:sticky lg:top-20">
            <h2 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-3">Publish</h2>
            <p className="mt-2 text-[0.84rem] text-ink-2">
              {isPublished ? "This story is live. Saving as a draft takes it off the site." : "Drafts are only visible to editors."}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="submit" name="intent" value="draft" disabled={pending} className="btn btn-sm border-[1.5px] border-rule bg-surface hover:border-ink-3 disabled:opacity-60">
                {isPublished ? "Unpublish" : "Save draft"}
              </button>
              <button type="submit" name="intent" value="publish" disabled={pending} className="btn btn-sm btn-accent disabled:opacity-60">
                {pending ? "Saving…" : isPublished ? "Update" : "Publish"}
              </button>
            </div>
            {story && (
              <Link href={`/news/${story.slug}`} target="_blank" className="mt-3 inline-block text-[0.84rem] font-semibold text-ink-2 hover:text-terracotta">
                {isPublished ? "View on site ↗" : "Preview draft ↗"}
              </Link>
            )}
          </section>

          <Panel title="Placement">
            <div>
              <Label htmlFor="categorySlug">Section</Label>
              <select id="categorySlug" name="categorySlug" defaultValue={story?.categorySlug ?? ""} className={`field mt-1.5 ${errCls("categorySlug")}`} {...err("categorySlug")}>
                <option value="" disabled>
                  Choose a section
                </option>
                {options.sections.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FieldError id="categorySlug-error" msg={e.categorySlug} />
            </div>
            <div>
              <Label htmlFor="countryCode">Country</Label>
              <select id="countryCode" name="countryCode" defaultValue={story?.countryCode ?? ""} className={`field mt-1.5 ${errCls("countryCode")}`} {...err("countryCode")}>
                <option value="" disabled>
                  Choose a country
                </option>
                {options.countries.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FieldError id="countryCode-error" msg={e.countryCode} />
            </div>
            <div>
              <Label htmlFor="isoDate">Publication date</Label>
              <input id="isoDate" name="isoDate" type="date" defaultValue={story?.isoDate ?? today()} className={`field mt-1.5 ${errCls("isoDate")}`} {...err("isoDate")} />
              <FieldError id="isoDate-error" msg={e.isoDate} />
            </div>
            <label className="flex items-start gap-3 rounded-2xl bg-terracotta-soft/60 p-3">
              <input type="checkbox" name="isHeroFeatured" defaultChecked={story?.isHeroFeatured ?? false} className="mt-1 h-4 w-4 accent-[#C24E2A]" />
              <span className="text-[0.86rem]">
                <span className="font-semibold">Lead story</span>
                <span className="block text-ink-2">Top of the front page and news section. Replaces the current lead.</span>
              </span>
            </label>
            <div>
              <Label htmlFor="trendingRank" hint="Takes the slot from whichever story holds it">
                Most read
              </Label>
              <select id="trendingRank" name="trendingRank" defaultValue={String(story?.trendingRank ?? "")} className="field mt-1.5">
                <option value="">Not in Most read</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    Position {n}
                  </option>
                ))}
              </select>
            </div>
          </Panel>

          <Panel title="Byline">
            <div>
              <Label htmlFor="author">Author</Label>
              <select id="author" name="author" value={author} onChange={(ev) => setAuthor(ev.target.value)} className={`field mt-1.5 ${errCls("author")}`} {...err("author")}>
                {options.authors.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name} · {a.role}
                  </option>
                ))}
                <option value="__new">+ New author…</option>
              </select>
              <FieldError id="author-error" msg={e.author} />
            </div>
            {author === "__new" && (
              <div className="space-y-3 rounded-2xl bg-paper-2 p-3">
                <div>
                  <Label htmlFor="newAuthorName">Name</Label>
                  <input id="newAuthorName" name="newAuthorName" className="field mt-1.5 !min-h-10" />
                </div>
                <div>
                  <Label htmlFor="newAuthorRole">Role</Label>
                  <input id="newAuthorRole" name="newAuthorRole" placeholder="e.g. Riyadh Correspondent" className="field mt-1.5 !min-h-10" />
                </div>
                <fieldset>
                  <legend className="text-[0.88rem] font-semibold">Photo</legend>
                  <div className="mt-1.5 flex gap-2">
                    {options.avatars.map((src, i) => (
                      <label key={src} className="cursor-pointer">
                        <input type="radio" name="newAuthorAvatar" value={src} defaultChecked={i === 0} className="peer sr-only" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-11 w-11 rounded-full object-cover ring-offset-2 peer-checked:ring-2 peer-checked:ring-terracotta peer-focus-visible:ring-2 peer-focus-visible:ring-ink" />
                        <span className="sr-only">{src.split("/").pop()}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
          </Panel>

          <Panel title="Photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={uploadPreview ?? image}
              alt=""
              className="aspect-[16/10] w-full rounded-2xl bg-paper-2 object-cover"
            />
            <div>
              <Label htmlFor="imageFile" hint="JPG, PNG or WebP, up to 5 MB">
                Upload a new photo
              </Label>
              <input
                ref={fileRef}
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(ev) => {
                  const f = ev.target.files?.[0];
                  setUploadPreview(f ? URL.createObjectURL(f) : null);
                }}
                className="mt-1.5 block w-full text-[0.84rem] file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[0.82rem] file:font-semibold file:text-paper hover:file:bg-teal"
                {...err("image")}
              />
              {uploadPreview && (
                <button
                  type="button"
                  onClick={() => {
                    if (fileRef.current) fileRef.current.value = "";
                    setUploadPreview(null);
                  }}
                  className="mt-1.5 text-[0.8rem] font-semibold text-ink-3 hover:text-terracotta"
                >
                  Remove upload, use a library photo
                </button>
              )}
              <FieldError id="image-error" msg={e.image} />
            </div>
            <fieldset disabled={Boolean(uploadPreview)} className="disabled:opacity-50">
              <legend className="text-[0.88rem] font-semibold">Or choose from the library</legend>
              <div className="mt-2 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1">
                {options.images.map((src) => (
                  <label key={src} className="cursor-pointer">
                    <input
                      type="radio"
                      name="image"
                      value={src}
                      checked={image === src}
                      onChange={() => setImage(src)}
                      className="peer sr-only"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full rounded-xl object-cover opacity-80 ring-offset-2 transition peer-checked:opacity-100 peer-checked:ring-[3px] peer-checked:ring-terracotta peer-focus-visible:ring-2 peer-focus-visible:ring-ink hover:opacity-100"
                    />
                    <span className="sr-only">{src.split("/").pop()}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <Label htmlFor="imageCaption" hint="Describe what the photo shows">
                Caption
              </Label>
              <textarea
                id="imageCaption"
                name="imageCaption"
                rows={2}
                defaultValue={story?.imageCaption ?? ""}
                className={`field mt-1.5 ${errCls("imageCaption")}`}
                {...err("imageCaption")}
              />
              <FieldError id="imageCaption-error" msg={e.imageCaption} />
            </div>
          </Panel>

          <Panel title="Tags and products">
            <div>
              <Label htmlFor="tags" hint="Comma separated">
                Tags
              </Label>
              <input id="tags" name="tags" defaultValue={(story?.tags ?? []).join(", ")} placeholder="ZATCA, E-invoicing, ERP" className="field mt-1.5" />
            </div>
            <fieldset>
              <legend className="text-[0.88rem] font-semibold">
                Products mentioned <span className="ml-1 text-[0.78rem] font-normal text-ink-3">Up to 4</span>
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {options.software.map((o) => (
                  <label key={o.value} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.84rem] hover:bg-paper-2">
                    <input
                      type="checkbox"
                      name="relatedSoftwareSlugs"
                      value={o.value}
                      defaultChecked={story?.relatedSoftwareSlugs?.includes(o.value)}
                      className="h-4 w-4 accent-[#0E4B48]"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <input type="hidden" name="readTime" value={`${minutes} min read`} />
          </Panel>
        </aside>
      </form>

      {story && (
        <section className="card flex flex-wrap items-center justify-between gap-3 border-terracotta-soft p-5">
          <div>
            <h2 className="font-semibold">Delete this story</h2>
            <p className="text-[0.84rem] text-ink-3">Removes it from the site and the CMS. This can&rsquo;t be undone.</p>
          </div>
          {confirmDelete ? (
            <form action={deleteStoryAction} className="flex items-center gap-2">
              <input type="hidden" name="id" value={story.id} />
              <button type="button" onClick={() => setConfirmDelete(false)} className="btn btn-sm border-[1.5px] border-rule bg-surface">
                Cancel
              </button>
              <button type="submit" className="btn btn-sm bg-terracotta-deep text-white hover:bg-[#7d2e16]">
                Yes, delete it
              </button>
            </form>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)} className="btn btn-sm border-[1.5px] border-terracotta text-terracotta hover:bg-terracotta-soft">
              Delete story
            </button>
          )}
        </section>
      )}
    </div>
  );
}
