
const dateStr = "2026-02-18T13:25:00+05:30";
const timestamp = new Date(dateStr).getTime() / 1000;
console.log(`String: ${dateStr}`);
console.log(`Timestamp: ${timestamp}`);
console.log(`Reversed: ${new Date(timestamp * 1000).toISOString()}`);

const data = [
    ["2026-02-18T13:25:00+05:30", 2691.9, 2693.2, 2684.6, 2686.6, 25962]
];

const parsed = data.map(d => ({
    time: new Date(d[0]).getTime() / 1000,
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
    volume: d[5]
}));

console.log('Parsed:', parsed);
