export const toDate = (val: unknown): Date => {
  if (val == null) return new Date(0);

  if (typeof val === "string" || typeof val === "number") {
    const d = new Date(val);
    return isNaN(d.getTime()) ? new Date(0) : d;
  }

  if (typeof val === "object") {
    // @ts-ignore
    const s = val.seconds ?? val._seconds;
    // @ts-ignore
    const ns = val.nanoseconds ?? val._nanoseconds ?? 0;
    if (typeof s === "number") {
      return new Date(s * 1000 + Math.floor(ns / 1e6));
    }
  }

  return new Date(0);
};
