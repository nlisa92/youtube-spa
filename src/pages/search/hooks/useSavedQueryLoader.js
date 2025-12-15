import { useMemo } from "react";

export default function useSavedQueryLoader(location) {
  return useMemo(() => location.state?.savedQuery || null, [location.state]);
}
