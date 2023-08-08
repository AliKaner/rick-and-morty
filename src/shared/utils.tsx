export function extractIdFromUrl(url: string): string | null {
    const idMatch = url.match(/\/(\d+)$/);
    return idMatch ? idMatch[1] : null;
}