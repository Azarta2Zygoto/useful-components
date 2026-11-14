import type { ReactNode } from "react";

import GitHubIcon from "@ui/assets/github.svg";

import Icon from "./ui/icon/Icon";

interface FooterProps {
    link?: string;
    name?: string;
}

export default function Footer({ link, name }: FooterProps): ReactNode {
    return (
        <footer>
            <p>&copy; 2026 useful Components. All rights reserved.</p>
            <a
                href={`https://github.com/Azarta2Zygoto/useful-components${link ? `/tree/main/${link}` : ""}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>
                    Visit the <i>Useful Components</i> GitHub repository
                    {name ? <> for the {name} component</> : ""}
                </span>
                <Icon icon={GitHubIcon} />
            </a>
        </footer>
    );
}
