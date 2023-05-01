export interface ScrollbarInitialState {
  list: ScrollbarResponse;
  isFetching: boolean;
  error: any;
}

export interface ScrollbarItem {
  title: string;
  url: string;
  id: string;
}

export type ScrollbarResponse = Array<ScrollbarItem>;
