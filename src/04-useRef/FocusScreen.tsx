import { useRef } from "react";

export const FocusScreen = () => {
  // Nos permite tener una referencia que no dispara un re-render
  // Empieza en null porque el componente aún no se monta y tipamos con el tipo de dato del input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(inputRef.current?.value);
    inputRef.current?.select();
    //inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Focus Screen</h1>

      <input
        ref={inputRef}
        type="text"
        className="bg-white text-black px-4 py-2 rounded-md"
        autoFocus
      />

      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-800"
      >
        Set Focus
      </button>
    </div>
  );
};
