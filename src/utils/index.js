export function createPageUrl(pageName) {
  return "/" + pageName.trim().toLowerCase().replace(/\s+/g, "-");
}