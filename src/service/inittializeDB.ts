import db from "../db/postgres/postgresDb";
import User from "../models/user"
import Guest from "../models/guest"
import Subject from "../models/subject"
import Requests from "../models/userRequests";
//import UseRequests from "../models/userRequests"
import GuestRequests from "../models/guest_requests"
import UserTokens from "../models/user_tokens"
import GuestTokens from "../models/guest_tokens"
import Transaction from "../models/transaction"
import MailCode from "../models/mailCode"
import SupportAccess from "../models/support_access"
import FCM from "../models/fcm"
import UnreadMessages from "../models/unreadMessages"
import PaymentTransactions from "../models/paymentTransactions"
class InitializeDBService{
    
    async initializeModelDB():Promise<boolean>{
        try {
          await db.authenticate();
          await this.initializeModels();
          return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
        
    }

    private async initializeModels(){
        await PaymentTransactions.sync({ alter: true });
        await SupportAccess.sync({alter:true})
        await  User.sync({ alter: true });
        await  Guest.sync({ alter: true });
        await  Requests.sync({ alter: true });
        await  GuestRequests.sync({ alter: true });
        await  Subject.sync({ alter: true });
        await  UserTokens.sync({ alter: true });
        await  GuestTokens.sync({ alter: true });
        await  Transaction.sync({ alter: true });
        await  MailCode.sync({ alter: true });
        await  FCM.sync({ alter: true });
        await UnreadMessages.sync({ alter: true });
        
    }
}

export default new InitializeDBService();