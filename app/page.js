'use client';
import { UserAuth } from "./FireBase/authContext";

export default function Home() {

  const {user,googleSignIn,logOut} = UserAuth();

  const handelSignIn = async() => {
    try{
      await googleSignIn();
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className="flex justify-center">
      <div>
        {
          !user && <button onClick={handelSignIn} className="p-6 bg-slate-600">login</button>
        }
      </div>
    </div>
  )
}
