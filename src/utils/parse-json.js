export default function parseJSON(value) {
  if (!value) return;

  try {
    return JSON.parse(value);
  } catch (error) {
    if (/^{/.test(value)) {
      throw new Error('Could not parse JSON value \'' + value + '\'');
    }

    return value;
  }
}