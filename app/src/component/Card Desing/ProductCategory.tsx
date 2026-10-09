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
                    inline-flex items-center justify-between gap-1.5
                    min-w-[110px]
                    rounded-lg border border-[#c8d6c8] bg-white
                    px-2.5 py-1.5
                    text-xs font-medium text-[#17251b]
                    transition-colors
                    hover:border-[#a8bfa8] hover:bg-[#f7fbf7]
                    focus:outline-none focus:ring-2 focus:ring-green-500/30
                    active:scale-[0.98]
                    xs:min-w-[130px] xs:gap-2 xs:px-3 xs:py-2 xs:text-sm
                    sm:min-w-[150px] sm:px-4
                "
            >
                <span className="truncate">{selected.label}</span>
                <span
                    aria-hidden="true"
                    className={`
                        shrink-0 text-[9px] leading-none
                        transition-transform duration-200
                        xs:text-[10px]
                        ${open ? "rotate-180" : ""}
                    `}
                >
                    ▲
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    role="listbox"
                    className="
                        absolute right-0 z-20 mt-1
                        min-w-[180px] max-w-[calc(100vw-2rem)]
                        overflow-hidden rounded-xl border border-[#e1e8e3]
                        bg-white py-1 shadow-lg shadow-green-900/5
                        xs:min-w-[200px]
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
                                        px-3 py-2 text-left text-xs
                                        transition-colors
                                        xs:px-4 xs:py-2.5 xs:text-sm
                                        ${isActive
                                            ? "text-[#008f46]"
                                            : "text-gray-700 hover:bg-[#f4faf5]"
                                        }
                                    `}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="inline-block w-3 shrink-0 text-[#008f46] xs:w-4"
                                    >
                                        {isActive ? "✓" : ""}
                                    </span>
                                    <span className="whitespace-nowrap">
                                        {opt.label}
                                    </span>
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