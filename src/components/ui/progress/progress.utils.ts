export function correctprogressMax(max: number | undefined): number {
    if (max === undefined || max <= 0 || isNaN(max)) {
        return 1;
    }
    return max;
}

export function regularDotPosition(index: number, count: number): number {
    return count > 1 ? (index / (count - 1)) * 100 : 50;
}

export function preciseDotPosition(value: number, max: number): number | null {
    if (value < 0 || value > max || isNaN(value)) {
        return null;
    }
    return max > 0 ? (value / max) * 100 : 0;
}

export function correctProgressValue(
    value: number | undefined,
    max: number,
): number | undefined {
    if (value === undefined) {
        return undefined;
    } else if (value < 0) {
        return 0;
    } else if (value > max) {
        return max;
    } else if (isNaN(value)) {
        return 0;
    }
    return value;
}
