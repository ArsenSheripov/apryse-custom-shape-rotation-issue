import { DocumentCoreInstance } from 'shared/libs/apryse/document-core';

export const setupSelectionModel = (Annotations: DocumentCoreInstance['Annotations']) => {
  const { SelectionModel, ControlHandle, Color } = Annotations;

  ControlHandle.outlineColor = new Color(36, 138, 246);
  ControlHandle.color = new Color(36, 138, 246);

  SelectionModel.defaultSelectionOutlineColor = new Color(36, 138, 246);
};
