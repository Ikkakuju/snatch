export const REPO_URL = "https://github.com/Ikkakuju/snatch";

/** Always the newest release: the release workflow uploads a version-free `Snatch.dmg`. */
export const DOWNLOAD_URL = `${REPO_URL}/releases/latest/download/Snatch.dmg`;

/** Ad link opened in a new tab on the first download click. Empty → no ad. */
export const AD_URL = import.meta.env.VITE_AD_URL ?? "";
