
import Papa from "papaparse";

export function parseCSV<T>(csvText: string): T[] {
    const result = Papa.parse<T>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
    });

    if (result.errors.length > 0) {
        throw new Error(
            `CSV parsing failed: ${result.errors[0].message}`
        );
    }

    return result.data;
}
