import firebase from 'firebase';
import { apiKey,authDomain,databaseURL,projectId,storageBucket,messagingSenderId,appId } from 'react-native-dotenv';
import { user } from '../Assets/dummy';
import Chat from '../screen/Chat';



let config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: 'https://realtime-tracker-dhieoit.firebaseio.com',
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

let app = firebase.initializeApp(config);
let db = app.database();

class FirebaseSDK {
    constructor() {
      if (!firebase.apps.length) {
       app
      }
    }
    login = async (user, success_callback, failed_callback) => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback, failed_callback);
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
      }

    get ref() {
        return firebase.database().ref('Messages');
        
      }
    
      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);
    
        const message = {
          id,
          _id,
          timestamp,
          text,
          user,
        };
        return message;
      };
    
      refOn = callback => {
        this.ref
        //.child(this.uid).child('pwxuBOZ5omWZBRhbI0AEoNCUSN13')
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
      }
    refOn = (receiverUid) => {
        this.ref.child(this.uid).child(receiverUid)
    }
    
      get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
      }

    //   get bothUid = (sender,receiver)=>{
    //       return {
    //           sender:sender,
    //           receiver:receiver
    //       }
    //   }
    //   get lastOnline(){
    //       return firebase.auth().currentUser.metadata.lastSignInTime
    //   }
    // get lastOnline(){
    //     return new Date.
    // }
      // send the message to the Backend
      send =  async messages => {
        let fromUid = 'SWtnfcnbSVWBWv5qwJRHdfjYcl42';
      //await  console.warn(fromUid)
        let msgId = this.ref.child(fromUid).child(this.uid)
        
        let updates = {};
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          let message = {
            text,
            user,
            createdAt: this.timestamp,

          };
          //this.ref.push(message);
          updates['Messages/'+fromUid+'/'+this.uid] = message
          //  updates['Messages/'+this.uid+'/'+fromUid] = message
            await console.warn(updates)

            firebase.database().ref().update(updates);
        }
      };
    
      refOff() {
        this.ref.off();
      }
    

    // signOut = async () => {
    //     await firebase.auth().signOut();
    // }

    createAccount = async (user) => {
        console.warn(user);
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {  
           //console.warn(data.user.uid)
            db.ref('users/'+ data.user.uid).set({
                uid:data.user.uid,
                email:user.email,
                FullName:user.FullName,
                longitude:user.longitude,
                latitude:user.latitude,
                image:user.image
              });
        })
        .catch(error => {
           alert(error);
        });
      }
    }
  
  const firebaseSDK = new FirebaseSDK();

    export default firebaseSDK;

    export const dbs = db;
