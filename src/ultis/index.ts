export function env(key: string, defaulValue?: any) {
  return process.env[key] ?? defaulValue;
}

module.exports = { env };
