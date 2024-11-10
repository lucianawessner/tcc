export class Response<TData> {
    private _code: number;
    public Data?: TData;
    public Message?: string;
  
    constructor(data?: TData, code: number = Configuration.DefaultStatusCode, message?: string) {
      this.Data = data;
      this._code = code;
      this.Message = message;
    }
  
    get isSuccess(): boolean {
      return this._code >= 200 && this._code <= 299;
    }
}
  
const Configuration = {
DefaultStatusCode: 200,
};
  