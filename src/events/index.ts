export enum DOCUMENT_EVENTS {
  CREATED = "DOCUMENT_CREATED",
  UPDATED = "DOCUMENT_UPDATED",
  DELETED = "DOCUMENT_DELETED"
}

export interface DocumentEventsFor {
  CREATED: () => string;
  UPDATED: () => string;
  DELETED: () => string;
}

export const documentEventsFor = (document: string): DocumentEventsFor => {
  return {
    CREATED: (): string => {
      return `${document}:${DOCUMENT_EVENTS.CREATED}`;
    },
    UPDATED: (): string => {
      return `${document}:${DOCUMENT_EVENTS.UPDATED}`;
    },
    DELETED: (): string => {
      return `${document}:${DOCUMENT_EVENTS.DELETED}`;
    },
  };
};
