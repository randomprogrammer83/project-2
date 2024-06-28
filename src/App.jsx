import React, { useCallback } from 'react';
import { useState,useEffect ,useRef} from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState('');
  const [charAllowed, setcharAllowed] = useState(false);
  const [noAllowed,setnoAllowed]=useState(false);
  const genPassword=useCallback(()=>{
       let str="ABCEFGHIKJLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
       let pass="";
       if(noAllowed)
        {
          str+='0123456789';
        }
        if(charAllowed){
          str+='!@#$%^&*()';
        }
       for(let i=1;i<=length;i++){

          let char=Math.floor(Math.random()*str.length +1);
          pass+=str.charAt(char);
       }
       setpassword(pass);

  },[length,noAllowed,charAllowed,setpassword]);
  const passwordref=useRef(null)

 const  copytocilpboard =useCallback(()=>{
  passwordref.current.select(4);
   window.navigator.clipboard.writeText(password)
 
 },[password])
 

 
    
 useEffect(()=>{
  genPassword()
 },[length,charAllowed,noAllowed,genPassword])

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-md shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h2 className='text-white text-2xl text-center'>Password Generator</h2>
        <div className='flex items-center'>
          <input 
            type="text"
            value={password} 
            className='w-full outline-none py-1 px-3 rounded-lg '
            placeholder='Password'
            readOnly
          ref={passwordref}
          />
          <button  onClick={copytocilpboard}
            className='outline-none px-3 py-0.5 shrink-0 bg-blue-600 rounded-md ml-2 hover:bg-orange-600 text-white'>
            copy
            
          </button>
        </div>
     
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
         <input type="range"
         className='w-full outline-none mt-2 cursor-pointer'
         min={0}
         max={100}
         value={length}
         onChange={(e)=>setlength(e.target.value)}
          />
          <label htmlFor="length" className='text-x ml-2 mt-2'>Length:{length}</label>
          <input type="checkbox" 
           className='mt-2 ml-2 cursor-pointer'
           value={noAllowed}
           onChange={(e)=>setnoAllowed(e.target.checked)}
           />
           <label htmlFor="Number" className='mt-2 ml-1 '>Number</label>

           <input type="checkbox" 
           className='mt-2 ml-2 cursor-pointer'
           value={charAllowed}
           onChange={(e)=>setcharAllowed(e.target.checked)}
           />
           <label htmlFor="Char" className='mt-2 ml-1 '>Character</label>
        </div>

      </div>
    </div>
    </div>
  );
}

export default App;