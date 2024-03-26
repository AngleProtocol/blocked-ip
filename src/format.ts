import { readdirSync } from 'fs';

const dnsRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)+[a-zA-Z]{2,}$/;
const inputDirectory = import.meta.dir + '/../input/';

export default async function formatDns(): Promise<string[]> {

    const inputFiles = readdirSync(inputDirectory);

    const dnsList = new Set<string>();

    await Promise.all(inputFiles.map(async (input) => {
        const file = Bun.file(inputDirectory + input);
        const lines = (await file.text()).split('\n');

        lines.forEach((line) => line.split(',').forEach((expr) => dnsList.add(dnsRegex.exec(expr)?.[0] ?? "")));
    }))

    return Array.from(dnsList).filter(a => a);
}