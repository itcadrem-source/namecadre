export function createHostvibeSourcePlaceholder(name: string) {
  function HostvibeSourcePlaceholder() {
    return null;
  }

  HostvibeSourcePlaceholder.displayName = name;
  return HostvibeSourcePlaceholder;
}
