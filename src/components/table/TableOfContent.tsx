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
    const [activeId, setActiveId] = useState<Set<string>>(new Set());

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

        const visibility = new Map<string, boolean>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(
                        (entry.target as HTMLElement).id,
                        entry.isIntersecting,
                    );
                });

                setActiveId(
                    new Set(
                        headings
                            .filter((heading) => visibility.get(heading.id))
                            .map((heading) => heading.id),
                    ),
                );
            },
            {
                rootMargin: "10px",
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
                        data-active={activeId.has(item.id) ? "true" : "false"}
                        className="toc-item"
                    >
                        <a
                            href={`#${item.id}`}
                            className={`toc-level-${item.level}`}
                            onClick={(event) => handleClick(event, item.id)}
                            aria-current={
                                activeId.has(item.id) ? "location" : undefined
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
