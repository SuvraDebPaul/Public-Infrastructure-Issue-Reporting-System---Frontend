import React from "react";
export function Select({ value, onValueChange, children }) {
  return (
    <div>
      {React.cloneElement(children, {
        value,
        onChange: (e) => onValueChange(e.target.value),
      })}
    </div>
  );
}

export function SelectTrigger({ children, className = "", ...props }) {
  return (
    <select
      className={`border rounded-lg px-3 py-2 w-full ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
