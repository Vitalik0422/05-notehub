export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

type TagType = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface GetNoteRequest {
  title: string;
  content: string;
  tag: TagType;
}
