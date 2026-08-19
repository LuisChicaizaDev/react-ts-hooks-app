import React from "react";

interface Props {
  title: string;
}

export const MyTitle = React.memo(({ title }: Props) => {
  console.log("My title re-render");

  return <h2 className="text-3xl">{title}</h2>;
});
