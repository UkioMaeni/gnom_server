import admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
var serviceAccount =require('./fboptions.json')

   let app:admin.app.App|null=null;

class FireBaseService{
    initialize(){
        app=admin.initializeApp({
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
          await app!.messaging().send(message)
        } catch (error) {
          console.log(error);
          
        }
                
    }
}

export default new FireBaseService()
