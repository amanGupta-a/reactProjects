import { useCallback, useState, useEffect , useRef, use} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [pass, setPass]=useState("");
  const passwordRef=useRef(null);
  const passGenerator=useCallback(()=>{
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass="";
    if(includeSymbols){
      str+="!@#$%^&*()_+=-{}[]|:;\"'<>,.?/`~";
    }
    if(includeNumbers){
      str+="0123456789";
    }
    for(let i=0;i<length;i++){
      let index=Math.floor(Math.random()*str.length);
      pass+=str.charAt(index);
    }
    setPass(pass);
  },[length, includeSymbols, includeNumbers]);
  useEffect(()=>{
    passGenerator();
  }, [length, includeNumbers,includeSymbols, passGenerator]);
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass])
  return (
    <div  className="min-h-screen flex items-center bg-gray-900">
      <div className='w-full max-w-md mx-auto my-8 px-10 py-5 rounded-xl bg-gray-400 '>
        <h1 className='text-3xl font-bold mb-4 text-center'>Password Generator</h1>
        <div className='flex overflow-hidden rounded-xl m-10 shadow-lg font-bold'>
          <input type="text" placeholder="password" value={pass} readOnly className='outline-none w-full py-3 px-2 bg-gray-200 text-gray-800' ref={passwordRef} />
          <button className='outline-none shrink-none px-3 bg-blue-500 text-white text-bold hover:bg-blue-600
          active:bg-blue-900  transition-colors duration-200 cursor-pointer' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex gap-x-2 font-bold text-sm'>
          <div className='flex item-center gap-x-1  '>
            <input type="range"
            min={8} max={100} value={length} 
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label >Length:{length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={includeNumbers}
            onChange={()=>{setIncludeNumbers((prev)=>!prev)}}/>
            <label>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={includeSymbols}
            onChange={()=>{setIncludeSymbols((prev)=>!prev)}}/>
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
