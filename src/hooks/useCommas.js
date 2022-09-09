export default function useCommas(tokens) {
  if (tokens === 0) {
    return tokens;
  }
  if (tokens === 1000000) {
    return '1,000,000';
  } else if (tokens >= 100_000) {
    const first = String(tokens).slice(0, 3);
    const last = String(tokens).slice(3);
    return `${first},${last}`;
  } else if (tokens >= 10_000) {
    const first = String(tokens).slice(0, 2);
    const last = String(tokens).slice(2);
    return `${first},${last}`;
  } else if (tokens >= 1_000) {
    const first = String(tokens).slice(0, 1);
    const last = String(tokens).slice(1);
    return `${first},${last}`;
  } else {
    return tokens;
  }
}
