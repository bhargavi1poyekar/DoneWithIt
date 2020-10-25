import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig={
    apiKey: "AIzaSyBctnAeCBDvAji3j1Fb0V9Pf9hnEs1LSYo",
    authDomain: "donewithit-3a169.firebaseapp.com",
    databaseURL: "https://donewithit-3a169.firebaseio.com",
    projectId: "donewithit-3a169",
    storageBucket: "donewithit-3a169.appspot.com",
    messagingSenderId: "107312138595",
    appId: "1:107312138595:web:949178d4b3aab99e3dab56",
    measurementId: "G-VRS2PJ8GW5"
}
class Fire{
    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                callback(null,user)
            }
            else{
                firebase
                .auth()
                .signInAnonymously()
                .catch(error=>{
                    callback(error);
                });
            }
        });
    }

    getLists(callback){
        let ref=this.ref.orderBy('name');

        this.unsubscribe=ref.onSnapshot(snapshot=>{
            lists=[];
            snapshot.forEach(doc=>{
                lists.push({id: doc.id,...doc.data()});
            });

            callback(lists);
        });
    }

    addList(list)
    {
        let ref=this.ref;
        ref.add(list);
    }

    updateList(list){
        let ref=this.ref;
        ref.doc(list.id).update(list);
    }

    get userId(){
        
        return firebase.auth().currentUser.uid;
        
    }

    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists");
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;