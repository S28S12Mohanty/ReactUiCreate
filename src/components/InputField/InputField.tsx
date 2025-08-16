import React, { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, X } from "lucide-react"; 

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  passwordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  clearable,
  passwordToggle,
  type = "text",
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  const baseClasses =
    "rounded-lg border focus:outline-none w-full transition text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  const variantClasses = {
    filled:
      "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500",
    outlined:
      "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500",
    ghost:
      "bg-transparent border-transparent focus:ring-2 focus:ring-blue-500",
  };
  const errorClasses = invalid ? "border-red-500 focus:ring-red-500" : "";

  return (
    <div className="flex flex-col space-y-1 w-72">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          type={inputType}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${
            disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
          }`}
          {...props}
        />

        {/* Clear Button */}
        {clearable && value && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Password Toggle */}
        {passwordToggle && type === "password" && (
          <button
            type="button"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {inputType === "password" ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Helper & Error Messages */}
      {helperText && !errorMessage && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      )}
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
