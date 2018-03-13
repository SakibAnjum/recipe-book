import fb from 'firebase';

export class AuthService{

  signUp(email:string, password:string){
    return fb.auth().createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string, password: string){
    return fb.auth().signInWithEmailAndPassword(email,password);
  }

  signOut(){
    fb.auth().signOut();
  }

}
