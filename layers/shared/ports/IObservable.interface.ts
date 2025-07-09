export interface IObservable<T> {
  addObserver(observer: T): void
}
