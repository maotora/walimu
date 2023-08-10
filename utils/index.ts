export function tailwindClassNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
