const output = import.meta.dir + '/../input/nordvpn.csv';
;
const endpoint = "https://api.nordvpn.com/v2/servers";
const response = await (await fetch(endpoint)).json();

const hosts = response.servers?.map(({ hostname }: any) => hostname);

Bun.write(output, hosts.join('\n'), { createPath: true });
console.log('Written', hosts?.length, 'domains to', output);