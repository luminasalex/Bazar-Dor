"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SortKey = "default" | "price-asc" | "price-desc";

const OPTIONS: { value: SortKey; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "price-asc", label: "দাম: কম থেকে বেশি" },
    { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

interface SortDropdownProps {
    current: SortKey;
}

const SortDropdown = ({ current }: SortDropdownProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selected =
        OPTIONS.find((opt) => opt.value === current) ?? OPTIONS[0];

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSelect = (value: SortKey) => {
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());

        if (value === "default") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        const query = params.toString();
        router.push(query ? `?${query}` : "?", { scroll: false });
    };

    return (
        <div ref={wrapperRef} className="relative">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="
                    inline-flex min-w-[140px] items-center justify-between gap-2
                    rounded-lg border border-[#c8d6c8] bg-white
                    px-3 py-1.5 text-sm font-medium text-[#17251b]
                    transition-colors
                    hover:border-[#a8bfa8] hover:bg-[#f7fbf7]
                    focus:outline-none focus:ring-2 focus:ring-green-500/30
                    xs:px-4 xs:py-2
                "
            >
                <span>{selected.label}</span>
                <span
                    aria-hidden="true"
                    className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    ▲
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    role="listbox"
                    className="
                        absolute right-0 z-20 mt-1 min-w-[200px]
                        overflow-hidden rounded-xl border border-[#e1e8e3]
                        bg-white py-1 shadow-lg shadow-green-900/5
                    "
                >
                    {OPTIONS.map((opt) => {
                        const isActive = opt.value === current;
                        return (
                            <li key={opt.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => handleSelect(opt.value)}
                                    className={`
                                        flex w-full items-center gap-2
                                        px-4 py-2 text-left text-sm
                                        transition-colors
                                        ${isActive
                                            ? "text-[#008f46]"
                                            : "text-gray-700 hover:bg-[#f4faf5]"
                                        }
                                    `}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="inline-block w-4 text-[#008f46]"
                                    >
                                        {isActive ? "✓" : ""}
                                    </span>
                                    <span>{opt.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SortDropdown;