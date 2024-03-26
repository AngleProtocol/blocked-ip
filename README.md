# blocked-ip

A list of domains for the top US VPNs we have to block for legal reasons. The domains list is extracted from the `input` directory, their IP address is retrieved and written to `output/blocked.json` for the app to read.

## Update blocking list

To update run the following command: 
```
bun run src/ping.ts
```
After that, you can push all the changes.

## Fetching from APIs

Providers like NordVPN and Surfshark expose an API point for their servers list, therefore we can update the `.csv` using the corresponding commands:
```
bun run src/fetchNordVpn.ts
bun run src/fetchSurfshark.ts
```