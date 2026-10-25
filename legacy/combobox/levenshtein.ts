/**
 * Return the options that correspond the most to the input, ordered by relevance.
 *
 * @param {string} input - user input string
 * @param {string[]} options - list of candidate strings
 * @param {Object} [opts]
 * @param {number} [opts.maxResults=Infinity] - maximum number of results to return
 * @param {boolean} [opts.perfectMatch=false] - if true, only return exact matches
 * @returns {string[]} ordered list of best matching options
 */
export function bestMatches(
    input: string,
    options: string[],
    {
        maxResults = Infinity,
        perfectMatch = false,
    }: { maxResults?: number; minMatch?: number; perfectMatch?: boolean } = {},
): string[] {
    if (!input)
        return options
            .slice(0, maxResults)
            .sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: "base" }),
            );

    const q = input.trim().toLowerCase();

    // simple Levenshtein distance
    function levenshtein(a: string, b: string): number {
        const m = a.length,
            n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;
        const row = new Array(n + 1);
        for (let j = 0; j <= n; j++) row[j] = j;
        for (let i = 1; i <= m; i++) {
            let prev = row[0];
            row[0] = i;
            for (let j = 1; j <= n; j++) {
                const tmp = row[j];
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
                prev = tmp;
            }
        }
        return row[n];
    }

    const scored = options.map((opt) => {
        const t = String(opt).toLowerCase();

        // exact match
        if (t === q) return { opt, score: 1000 };

        let score = 0;

        // startsWith is very important
        if (t.startsWith(q)) score += 300;
        else if (perfectMatch) return { opt, score: 0 };

        // word boundary startsWith (e.g., match on a word start)
        const words = t.split(/\s+/);
        if (words.some((w) => w.startsWith(q))) score += 200;

        // substring match (position matters)
        const idx = t.indexOf(q);
        if (idx >= 0) score += Math.max(50, 180 - idx * 10);

        // fuzzy: normalized levenshtein contributes up to 200
        const lev = levenshtein(q, t);
        const norm = 1 - lev / Math.max(q.length, t.length);
        if (norm > 0) score += Math.round(norm * 200);

        // Prefer shorter / tighter matches for tie-breaking
        score -= Math.abs(t.length - q.length) * 2;

        // small boost for visible exact-case-insensitive equality of words
        if (words.includes(q)) score += 20;

        return { opt, score };
    });

    // sort descending by score, stable tie-breaker: shorter option then lexicographic
    scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (a.opt.length !== b.opt.length) return a.opt.length - b.opt.length;
        return a.opt.localeCompare(b.opt);
    });

    return scored
        .slice(0, maxResults)
        .filter((s) => s.score > 0)
        .map((s) => s.opt);
}
