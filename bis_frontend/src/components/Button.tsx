import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
}

function Button({text,...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        "bg-[var(--burnt-umber)] disabled:bg-[#e6beaf] hover:bg-[var(--caput-mortuum)] active:scale-75 transition-all text-white font-bold py-2 px-4 rounded " +
        (props.className ? " " + props.className : "")
      }
    >
      {text}
    </button>
  );
}

export default Button;
