"use client";

import { type RefObject, useEffect, useState } from "react";

import "./table-content.css";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface Props {
    sharedRef?: RefObject<HTMLElement | null>;
}

export default function TableOfContents({ sharedRef }: Props) {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const container = sharedRef?.current;

        if (!container) return;

        const headings = Array.from(
            container.querySelectorAll("h2, h3"),
        ) as HTMLElement[];

        const generatedItems = headings.map((heading, index) => {
            if (!heading.id) {
                heading.id = `section-${index}`;
            }

            return {
                id: heading.id,
                text: heading.textContent.replace("#", "") || "",
                level: Number(heading.tagName.substring(1)),
            };
        });

        setItems(generatedItems);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );

                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: "-10% 0px -80% 0px",
                threshold: 0,
            },
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [sharedRef]);

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) => {
        event.preventDefault();

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setActiveId(id);
    };

    if (items.length === 0) return null;

    return (
        <nav
            className="table-of-contents"
            aria-label="Table of contents"
        >
            <strong>Contents</strong>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        data-active={activeId === item.id}
                        className="toc-item"
                    >
                        <a
                            href={`#${item.id}`}
                            className={`toc-level-${item.level}`}
                            onClick={(event) => handleClick(event, item.id)}
                            aria-current={
                                activeId === item.id ? "location" : undefined
                            }
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
