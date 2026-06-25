export function getSecretOrEnv(name) {
  return process.env[name];
}