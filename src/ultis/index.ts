export function env(key: string, defaulValue?: any) {
  return process.env[key] ?? defaulValue;
}

export const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

