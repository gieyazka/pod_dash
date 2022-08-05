// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { app, database } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
type Data = {
  name: string
}

export default function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const auth = getAuth(app)
  auth.onAuthStateChanged(fireAuth =>{
    console.log(fireAuth?.email);
    if(fireAuth?.email != null){
      // return <TestPage />
      // router.push('/test')
    }else{
  // return <TestPage />

    }
    
  })
  res.status(200).json({ name: 'John Doe' })
}
