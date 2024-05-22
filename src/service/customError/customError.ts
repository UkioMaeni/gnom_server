class AppError extends Error {
    constructor(message:string) {
      super(message);
    }
  }
export default AppError;


//ошибки возникающие при работе с гостем

export enum EGuestControllerErrorType{
    noCreate,//пользователь не был создан
    invalidToken,//невалидный токен
}

export class GuestControllerError extends AppError{
    type:EGuestControllerErrorType;
    statusCode:number;
    constructor(message:string,errorType:EGuestControllerErrorType,statusCode:number){
        super(message);
        this.type=errorType;
        this.statusCode=statusCode;
    }
}

/*
 Library errors name:

 authGuest:
  noCreate - пользователь не был создан
*/ 

