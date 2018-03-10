export interface State {
  isProcessing: boolean;
  serverValidationErrors: any;
  actionLock: {
    allowedActions: Array<string>;
    message: string;
  },
  entities: Array<any>;
  selectedEntityId: number;
  editEntity: boolean;
}

export const initialState: State = {
  isProcessing: false,
  serverValidationErrors: null,
  actionLock: null,
  entities: [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jane Doe'
    }
  ],
  selectedEntityId: null,
  editEntity: false
}
