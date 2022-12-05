import { createFetch, useDateFormat } from "@vueuse/core";

const api = createFetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

const useFormat = (str) => {
  return useDateFormat(str, "D MMMM YYYY", {
    locales: "in-ID",
  }).value.replace(/^["'](.+(?=["']$))["']$/, "$1");
};

export { api, useFormat };
