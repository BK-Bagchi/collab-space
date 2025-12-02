export const cleanObject = (obj) => {
  const cleaned = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) return;

    // For arrays, remove empty items
    if (Array.isArray(value)) {
      const filtered = value.filter(
        (v) =>
          v !== "" &&
          v !== null &&
          v !== undefined &&
          !(typeof v === "object" && Object.keys(v).length === 0)
      );
      if (filtered.length > 0) cleaned[key] = filtered;
      return;
    }

    // For objects: remove empty nested values
    if (typeof value === "object") {
      const nested = cleanObject(value);
      if (Object.keys(nested).length > 0) cleaned[key] = nested;
      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
};
