import { readdirSync } from 'fs';
import getDns from './format';
import { exec } from 'child_process';

function ping(command: string): Promise<string> {
    return new Promise(resolve => {
        exec(command, (err, out) => resolve(out));
    });
}

const aggregated = await getDns();
const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
const output = import.meta.dir + '/../output/blocked.json';

const ipList = (await Promise.all(aggregated.map(async (dns) => {
    return ipRegex.exec(await ping(`ping -c 1 ${dns}`))?.[0];
}))).filter(a => a);

let json = JSON.stringify(ipList);

[['[', '[\n  '], [']', '\n]'], [',', ',\n  ']].forEach(([c, nc]) => json = json.replaceAll(c, nc))

console.log(json);

Bun.write(output, json, { createPath: true });
console.log('Wrote', ipList.length, "IP addresses to", output);