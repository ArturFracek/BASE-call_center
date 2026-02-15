import { useMediaQuery } from "@vueuse/core";

const MOBILE_MAX_WIDTH = 768;

export function useIsMobile() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
  return { isMobile };
}
