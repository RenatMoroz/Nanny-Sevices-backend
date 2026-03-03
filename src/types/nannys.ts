export type NannySortBy = 'name' | 'price_per_hour' | 'rating';
export type NannySortOrder = 'asc' | 'desc';
export type NannyFilterPreset =
  | 'a-z'
  | 'z-a'
  | 'less-than-10'
  | 'greater-than-10'
  | 'popular'
  | 'not-popular'
  | 'show-all';

export interface GetAllNannysParams {
  page?: number;
  perPage?: number;
  location?: string;
  characters?: string;
  price_per_hour?: number;
  sortBy?: NannySortBy;
  sortOrder?: NannySortOrder;
  preset?: NannyFilterPreset;
}
