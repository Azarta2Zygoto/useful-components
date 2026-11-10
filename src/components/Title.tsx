import { type PropsWithChildren, type ReactNode, useRef } from "react";

type HeadingTag = "h1" | "h2" | "h3";
interface Props {
    level: 1 | 2 | 3;
}

export default function Title({
    level,
    children,
}: PropsWithChildren<Props>): ReactNode {
    const ref = useRef<HTMLHeadingElement>(null);
    const Tag = `h${level}` as HeadingTag;
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-") ?? "";

    const handleAnchorClick = () => {
        const element = ref.current;

        if (!element) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        element.scrollIntoView({
            behavior: prefersReducedMotion ? "instant" : "smooth",
            block: "start",
        });

        window.history.pushState(null, "", `#${id}`);
    };

    return (
        <Tag
            ref={ref}
            id={id}
            className="anchor"
        >
            <button
                type="button"
                onClick={handleAnchorClick}
            >
                {children}
                <span>#</span>
            </button>
        </Tag>
    );
}
