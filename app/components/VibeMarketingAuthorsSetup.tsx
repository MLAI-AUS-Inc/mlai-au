import { useState } from "react";
import { Form } from "react-router";
import { Star, Trash2, UserPlus, Users } from "lucide-react";

import type { VibeMarketingAuthor } from "~/types/vibe-marketing";

type AuthorDraft = {
  /** Stable row key. Existing authors keep their server id; new rows use a `new-*` placeholder. */
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  url: string;
};

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";
const LABEL_CLASS = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600";

let newRowSeq = 0;

function newRowId(): string {
  newRowSeq += 1;
  return `new-${newRowSeq}`;
}

function emptyDraft(id: string): AuthorDraft {
  return { id, name: "", role: "", bio: "", avatarUrl: "", url: "" };
}

function toDraft(author: VibeMarketingAuthor): AuthorDraft {
  return {
    id: author.id,
    name: author.name ?? "",
    role: author.role ?? "",
    bio: author.bio ?? "",
    avatarUrl: author.avatarUrl ?? "",
    url: author.url ?? "",
  };
}

/** Slugify a name the same way the backend derives author ids, so the default pointer resolves. */
function slugifyName(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "author";
}

function resolvedId(draft: AuthorDraft): string {
  return draft.id.startsWith("new-") ? slugifyName(draft.name) : draft.id;
}

export default function VibeMarketingAuthorsSetup({
  authors,
  defaultAuthorId,
  isSubmitting,
}: {
  authors: VibeMarketingAuthor[];
  defaultAuthorId: string | null;
  isSubmitting: boolean;
}) {
  const [drafts, setDrafts] = useState<AuthorDraft[]>(() =>
    authors.length ? authors.map(toDraft) : [emptyDraft("new-0")],
  );
  const [selectedRowId, setSelectedRowId] = useState<string>(
    () => authors.find((author) => author.id === defaultAuthorId)?.id ?? authors[0]?.id ?? "new-0",
  );

  const patch = (id: string, partial: Partial<AuthorDraft>) =>
    setDrafts((current) => current.map((draft) => (draft.id === id ? { ...draft, ...partial } : draft)));

  const namedDrafts = drafts.filter((draft) => draft.name.trim());
  const selectedDraft =
    namedDrafts.find((draft) => draft.id === selectedRowId) ?? namedDrafts[0] ?? null;

  const serializedAuthors = namedDrafts.map((draft) => ({
    id: resolvedId(draft),
    name: draft.name.trim(),
    role: draft.role.trim(),
    bio: draft.bio.trim(),
    avatarUrl: draft.avatarUrl.trim(),
    url: draft.url.trim(),
  }));
  const serializedDefaultId = selectedDraft ? resolvedId(selectedDraft) : "";

  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-base font-black text-slate-950">Article authors</h3>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
            Every generated article is published under an author byline. Add the people who write for you and pick
            a default — you can choose a different author per article when you generate one.
          </p>
        </div>
      </div>

      <Form method="POST" className="mt-5 space-y-4">
        <input type="hidden" name="intent" value="save-authors" />
        <input type="hidden" name="authors" value={JSON.stringify(serializedAuthors)} />
        <input type="hidden" name="defaultAuthorId" value={serializedDefaultId} />

        <div className="space-y-3">
          {drafts.map((draft) => {
            const hasName = Boolean(draft.name.trim());
            const isDefault = selectedDraft?.id === draft.id && hasName;
            return (
              <div
                key={draft.id}
                className={`rounded-xl border bg-white p-4 transition ${
                  isDefault ? "border-violet-200 ring-1 ring-violet-100" : "border-slate-200"
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label
                    className={`inline-flex items-center gap-2 text-sm font-bold ${
                      isDefault
                        ? "text-violet-600"
                        : hasName
                          ? "cursor-pointer text-slate-600 transition hover:text-violet-600"
                          : "cursor-default text-slate-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="__defaultAuthorRow"
                      className="h-4 w-4 accent-violet-600"
                      checked={isDefault}
                      disabled={!hasName}
                      onChange={() => setSelectedRowId(draft.id)}
                    />
                    <Star
                      className={`h-4 w-4 ${
                        isDefault ? "fill-violet-600 text-violet-600" : hasName ? "text-violet-400" : "text-slate-400"
                      }`}
                    />
                    {isDefault ? "Default byline" : hasName ? "Set as default" : "Add a name to set as default"}
                  </label>
                  {drafts.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setDrafts((current) => current.filter((item) => item.id !== draft.id))}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-400 transition hover:bg-slate-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  ) : null}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className={LABEL_CLASS}>Name</span>
                    <input
                      value={draft.name}
                      onChange={(event) => patch(draft.id, { name: event.target.value })}
                      placeholder="Dr Sam Donegan"
                      className={INPUT_CLASS}
                    />
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>Role / title</span>
                    <input
                      value={draft.role}
                      onChange={(event) => patch(draft.id, { role: event.target.value })}
                      placeholder="Founder &amp; Lead Editor"
                      className={INPUT_CLASS}
                    />
                  </label>
                </div>

                <label className="mt-3 block">
                  <span className={LABEL_CLASS}>Short bio</span>
                  <textarea
                    value={draft.bio}
                    onChange={(event) => patch(draft.id, { bio: event.target.value })}
                    rows={2}
                    placeholder="One or two sentences shown in the article's author box."
                    className={INPUT_CLASS}
                  />
                </label>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className={LABEL_CLASS}>Avatar URL</span>
                    <input
                      value={draft.avatarUrl}
                      onChange={(event) => patch(draft.id, { avatarUrl: event.target.value })}
                      placeholder="https://…/avatar.png"
                      className={INPUT_CLASS}
                    />
                  </label>
                  <label className="block">
                    <span className={LABEL_CLASS}>Profile URL</span>
                    <input
                      value={draft.url}
                      onChange={(event) => patch(draft.id, { url: event.target.value })}
                      placeholder="https://www.linkedin.com/in/…"
                      className={INPUT_CLASS}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDrafts((current) => [...current, emptyDraft(newRowId())])}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
          >
            <UserPlus className="h-4 w-4" />
            Add author
          </button>
          <button
            type="submit"
            disabled={isSubmitting || serializedAuthors.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none disabled:hover:bg-slate-200"
          >
            {isSubmitting ? "Saving…" : "Save authors"}
          </button>
        </div>
      </Form>
    </div>
  );
}
