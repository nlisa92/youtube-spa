export function getEnvVar(name, { optional = false } = {}) {
  const value = import.meta.env[name];

  if (!optional && (!value || value.trim() === "")) {
    throw new Error(`❌ ENV переменная ${name} отсутствует или пустая!`);
  }

  return value;
}
