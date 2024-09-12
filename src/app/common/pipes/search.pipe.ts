import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';

export function search<T>(
  fetchRequest: (query: string) => Observable<T>,
  delay = 750
) {
  return (source$: Observable<string>) =>
    source$.pipe(
      debounceTime(delay),
      distinctUntilChanged(),
      map((value) => value.trim()),
      filter((value) => !!value),
      switchMap(fetchRequest)
    );
}
