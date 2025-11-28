function regexEnTexte(
    regex: string,
    text?: {
        minuscule?: string;
        majuscule?: string;
        accent?: string;
        number?: string;
        space?: string;
        others?: string;
        forbidden?: string;
    },
): string {
    const inclusion: string[] = [];
    if (regex.includes("a-z")) {
        inclusion.push(text?.minuscule || "lowercase letters");
    }
    if (regex.includes("A-Z")) {
        inclusion.push(text?.majuscule || "uppercase letters");
    }
    if (regex.includes("À-ÿ")) {
        inclusion.push(text?.accent || "letters with accents");
    }
    if (regex.includes("0-9")) {
        inclusion.push(text?.number || "numbers");
    }
    if (regex.includes("\\s")) {
        inclusion.push(text?.space || "spaces");
    }
    const indicesInclus: string[] = [];
    for (let i = 0; i < regex.length; i++) {
        if (regex[i] === "\\") indicesInclus.push(regex[i + 1]);
    }
    const subInclusionItemps: string[] = [];
    indicesInclus.forEach((item) => {
        if (
            item.length === 1 &&
            item !== "s" &&
            item !== "d" &&
            item !== "w" &&
            item !== "t" &&
            item !== "n" &&
            item !== "r" &&
            item !== "W" &&
            item !== "w" &&
            item !== "D" &&
            item !== "S"
        ) {
            subInclusionItemps.push(item);
        }
    });
    if (subInclusionItemps.length > 0) {
        inclusion.push(
            `${text?.others || "other characters"} : ${subInclusionItemps.join("")}`,
        );
    }
    const exclusion: string[] = [];
    const indicesExclus: string[] = [];
    for (let i = 0; i < regex.length; i++) {
        if (regex[i] === "/") indicesExclus.push(regex[i + 1]);
    }
    indicesExclus.forEach((item) => {
        if (
            item.length === 1 &&
            item !== "s" &&
            item !== "d" &&
            item !== "w" &&
            item !== "t" &&
            item !== "n" &&
            item !== "r" &&
            item !== "W" &&
            item !== "w" &&
            item !== "D" &&
            item !== "S"
        ) {
            exclusion.push(item);
        }
    });

    const debutTexte = inclusion.length > 0 ? inclusion.join(", ") : "";
    const suiteTexte =
        exclusion.length > 0
            ? `${text?.forbidden || "forbidden characters"}${exclusion.join(", ")}`
            : "";

    return `${debutTexte}${suiteTexte}`;
}

export { regexEnTexte };
