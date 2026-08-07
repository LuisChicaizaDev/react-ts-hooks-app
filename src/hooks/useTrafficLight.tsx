import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

// Para una mejor sincronia con el objeto colors
// El tipo será una llave del tipo de el objeto colors, de esta manera, todos los colores que se añadan al objeto serán permitidos
type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
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

  // Devolvemos un objeto literal
  return {
    // Props
    light,
    countdown,
    colors,

    // Computed
    percentage: (countdown / 5) * 100,
    redLight: light === "red" ? colors.red : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    greenLight: light === "green" ? colors.green : "bg-gray-500",
  };
};
