import * as React from "react";
import { cn } from "../utils.js";
import { User, Lock, Mail } from "lucide-react"
function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      {...props}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}
function FormInput({ placeholder, type = "text", onchange, value }) {
  const Icon =
    placeholder === "Username"
      ? User
      : placeholder === "Email"
      ? Mail
      : Lock;

  return (
    <div className="relative mb-4">
      <input
        value={value}
        onChange={onchange}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-100 border border-gray-200
        focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
      <Icon
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

export { Input,FormInput };
