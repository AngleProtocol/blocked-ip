const output = import.meta.dir + '/../input/surfshark.csv';
;
const endpoint = "https://cdn.jsdelivr.net/gh/Incognito-Coder/SurfSocks@main/profiles.json";
const response = await (await fetch(endpoint)).json();

const hosts = response?.map(({ server }: any) => server);

Bun.write(output, hosts.join('\n'), { createPath: true });
console.log('Written', hosts?.length, 'domains to', output);