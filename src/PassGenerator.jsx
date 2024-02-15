import { useState, useCallback, useEffect, useRef } from "react";

const PassGenerator = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberCheck, setNumberCheck] = useState(false);
  const [charCheck, setCharCheck] = useState(false);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberCheck) str += "0123456789";
    if (charCheck) str += "!@#$%^&*(){}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberCheck, charCheck]);

  let passwordRef = useRef(password);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passGen();
  }, [length, numberCheck, charCheck, passGen]);

  return (
    <div className="w-full h-screen bg-slate-950 px-[2  vw] py-24 md:px-[24vw]">
      <div className="w-full bg-[#ffffff23] rounded-xl flex flex-col gap-10 justify-center items-center p-10">
        <h1 className="text-3xl text-white  font-semibold">
          Password Generator
        </h1>
        <div className="w-full flex justify-center gap-1">
          <input
            className="px-4 py-2 w-[80%] rounded-lg"
            type="text"
            value={password}
            readOnly
            disabled
            placeholder="Password"
            ref={passwordRef}
          />
          <button
            className="px-2 py-2 bg-blue-600 rounded-lg text-white "
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center gap-8 text-white ">
          <input
            type="range"
            min={8}
            max={24}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>
            Length: <b>{length}</b>
          </label>
          <div className="flex gap-1">
            <input
              type="checkbox"
              id="Number-Check"
              onClick={() => setNumberCheck((prev) => !prev)}
            />
            <label htmlFor="Number-Check">Number</label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              id="Char-Check"
              onClick={() => setCharCheck((prev) => !prev)}
            />
            <label htmlFor="Char-Check">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassGenerator;
