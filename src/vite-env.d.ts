/// <reference types="vite/client" />

declare module "*.md" {
  import type { DevlogFrontmatter } from "@/types/devlog";
  export const frontmatter: DevlogFrontmatter;
  export const content: string;
  const raw: string;
  export default raw;
}
