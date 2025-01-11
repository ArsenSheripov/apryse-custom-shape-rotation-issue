
export const toolNames = {
  select: 'SelectTool',
  cross: 'ScrossTool',
  check: 'CheckTool',
  rectangle: 'RectangleTool',
  star: 'StarTool',
} as const;

export type OnlyLibraryToolNames = Omit<typeof toolNames, 'select'>;

export type OnlyLibraryToolNamesValues = (typeof toolNames)[keyof OnlyLibraryToolNames];

type ToolNamesKeys = keyof typeof toolNames;
export type ToolNamesValues = (typeof toolNames)[ToolNamesKeys];
