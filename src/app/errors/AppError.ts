class AppError extends Error{
    public statusCode: number;
    constructor(statusCode: number, message:string,stak = ''){
      super(message);
      this.statusCode = statusCode;
      if(stak){
        this.stack = stak
      }else{
        Error.captureStackTrace(this,this.constructor)
      }
      
    }
  }

export default AppError;