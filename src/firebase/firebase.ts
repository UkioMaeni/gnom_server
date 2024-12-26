import admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
var serviceAccount =require('./fboptions.json')
class FireBaseService{
    initialize(){
        const app=admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log(app.auth().app.options.credential);
        
    }
    async sendNotification(fcm:string,messageType:string):Promise<void>{
        try {
          const message:Message = {
            token:fcm, 
            notification: {
              title: 'Subject completed',
              body: 'Check message or push in app'
            },
            data: {
              messageType
            }
          };
          await admin.messaging().send(message)
        } catch (error) {
          console.log(error);
          
        }
                
    }
}

export default new FireBaseService()
