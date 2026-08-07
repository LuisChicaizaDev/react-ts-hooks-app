import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

// Para una mejor sincronia con el objeto colors
// El tipo será una llave del tipo de el objeto colors, de esta manera, todos los colores que se añadan al objeto serán permitidos
type TrafficLightColor = keyof typeof colors;

export const TrafficLightWithEffect = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");

  const [countdown, setCountDown] = useState(5);

  // Este efecto se dispara cada vez que cambia el countdown
  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      //console.log("setInterval llamado");
      setCountDown((prev) => prev - 1);
    }, 1000);

    // Limpiamos
    return () => {
      //console.log("Limpieza del efecto");
      clearInterval(intervalId);
    };
  }, [countdown]);

  // Efecto que dispara el cambio de color
  useEffect(() => {
    if (countdown === 0) {
      setCountDown(5); // Reseteamos el countdown
      if (light === "red") {
        setLight("green");
        return;
      }

      if (light === "yellow") {
        setLight("red");
        return;
      }

      if (light === "green") {
        setLight("yellow");
        return;
      }
    }
  }, [countdown, light]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl">Semáforo con useEffect</h1>
        <h2 className="text-white text-xl">Cuenta atrás: {countdown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-initial"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${light === "red" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${light === "yellow" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${light === "green" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
