export type TemplateCatalogEntry = {
  id: string;
  name: string;
  componentPath: string | null;
  sourceTemplatePath: string | null;
  sourceType: "component" | "reference-only";
  domain: string;
  fileKind: "code" | "asset" | "template" | "data" | "other";
  hostvibe: boolean;
  previewable: boolean;
  previewKey: string | null;
  previewText: string;
  templatePreviewText: string | null;
  statusNote: string;
};
