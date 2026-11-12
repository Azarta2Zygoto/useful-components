import type { ReactNode } from "react";

import Title from "./Title";

export type Element = {
    name: string;
    description: string;
};

export interface ComponentApiType {
    description: string;
    elements: Element[];
}

interface Props {
    elements: ComponentApiType;
    title?: string;
}

export default function ComponentApi({
    elements,
    title = "API",
}: Props): ReactNode {
    return (
        <>
            <Title level={2}>{title}</Title>
            <section>
                <p dangerouslySetInnerHTML={{ __html: elements.description }} />
                <ul className="component-api">
                    {elements.elements.map((element) => (
                        <li key={element.name}>
                            <strong>{element.name}:&nbsp;</strong>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: element.description,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
