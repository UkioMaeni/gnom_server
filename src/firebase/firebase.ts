import admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
var serviceAccount =require('./fboptions.json')
class FireBaseService{
    initialize(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    async sendNotification(fcm:string,text:string,subjectType:string):Promise<void>{
        const message:Message = {
            token:fcm, 
            notification: {
              title: 'Subject completed',
              body: 'Check message or push in app'
            },
            data: {
              text,
              subjectType
            }
          };
          await admin.messaging().send(message)
                
    }
}

export default new FireBaseService()
