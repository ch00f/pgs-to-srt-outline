import config from "./build.json" with { type: "json" };
import * as path from "std/path/mod.ts";

export function configVal(key: keyof typeof config): string {
  return config[key];
}

export function configPath(key: keyof typeof config): string {
  const val = configVal(key);
  const url = import.meta.resolve(val);
  return path.fromFileUrl(url);
}
