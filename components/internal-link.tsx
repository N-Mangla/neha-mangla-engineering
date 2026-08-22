import type { ComponentPropsWithoutRef } from "react";

type InternalLinkProps = ComponentPropsWithoutRef<"a">;

export function InternalLink(props: InternalLinkProps) {
  // Native navigation keeps the static portfolio independent of router cache state.
  return <a {...props} />;
}
