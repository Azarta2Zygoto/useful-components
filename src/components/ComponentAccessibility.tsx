import type { ReactNode } from "react";

import Title from "./Title";

export interface ComponentAcessibilityType {
    general: string;
    elements?: string[];
}

interface Props {
    elements: ComponentAcessibilityType;
}

export default function ComponentAccessibility({ elements }: Props): ReactNode {
    return (
        <>
            <Title level={2}>Accessibility</Title>
            <section>
                <p dangerouslySetInnerHTML={{ __html: elements.general }} />
                {elements.elements && (
                    <ul className="accessibility-api">
                        {elements.elements.map((element) => (
                            <li
                                key={element}
                                dangerouslySetInnerHTML={{
                                    __html: element,
                                }}
                            ></li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
}
