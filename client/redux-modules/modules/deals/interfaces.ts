export type ReducerState = {
  readonly list: ReadonlyArray<Deal>;
  readonly meta: ReadonlyArray<Meta>;
  readonly isLoaded: boolean;
  readonly isLoading: boolean;
};

export interface Deal {
  id: number,
  date: Date,
  value: number,
}

export interface Meta {
  isNew: boolean,
  isRemoving: boolean,
  isSaved: boolean,
  isSaving: boolean,
}

export interface DealWithMeta extends Deal, Meta{

};

export const sheme = ({ date, ...other }:{ date: number, other: object}) => ({
  date: new Date(date),
  ...other,
})
