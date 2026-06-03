import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link, useFetcher } from "react-router";
import { generateAvatarUrl, getInitials } from "~/lib/avatar";
import type { GenericHackathonRequests } from "~/lib/generic-hackathon";

/**
 * Header bell for Watt team leaders: polls incoming join-requests and shows a count badge.
 * Acting on a request happens on the Profile & Team page (linked from the dropdown).
 */
export default function WattNotificationBell({ basePath }: { basePath: string }) {
  const fetcher = useFetcher<GenericHackathonRequests>();
  const path = `${basePath}/notifications`;

  useEffect(() => {
    fetcher.load(path);
    const id = setInterval(() => fetcher.load(path), 45000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incoming = fetcher.data?.incoming ?? [];
  const count = incoming.length;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative -m-1.5 inline-flex h-10 w-10 items-center justify-center rounded-full p-1.5 text-[#155420] transition hover:bg-[#e6efd7]">
        <span className="sr-only">Join requests</span>
        <BellIcon className="h-5 w-5" aria-hidden="true" />
        {count > 0 && (
          <span className="absolute right-1 top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#df5047] px-1 text-[10px] font-black text-white ring-2 ring-[#fffefa]">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2.5 w-72 origin-top-right rounded-2xl border border-[#e8dfcf] bg-[#fffefa] p-2 shadow-[0_18px_42px_rgba(82,67,39,0.14)] focus:outline-none">
          <p className="px-2 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#64705f]">Join requests</p>
          {count === 0 ? (
            <p className="px-2 py-3 text-sm text-[#64705f]">You&rsquo;re all caught up.</p>
          ) : (
            <ul className="max-h-72 space-y-0.5 overflow-auto">
              {incoming.map((req) => (
                <li key={req.id} className="flex items-center gap-2 rounded-xl px-2 py-2">
                  <img
                    src={req.user.avatar_url || generateAvatarUrl(getInitials(req.user.full_name || req.user.email))}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#c9dbb8]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#121e16]">{req.user.full_name || req.user.email}</p>
                    <p className="truncate text-xs text-[#64705f]">wants to join {req.team_name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Menu.Item>
            {({ focus }) => (
              <Link
                to={`${basePath}/profile`}
                className={`mt-1 block rounded-xl px-2 py-2 text-center text-sm font-bold text-[#155420] ${focus ? "bg-[#e6efd7]" : ""}`}
              >
                Review in Profile &amp; Team
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
