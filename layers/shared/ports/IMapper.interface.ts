export interface IMapper<From, To> {
  mapTo(data: From): To
}
