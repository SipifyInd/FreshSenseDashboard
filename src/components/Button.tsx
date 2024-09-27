import { useRef, useEffect, useState, useCallback, ReactNode, FC } from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "primary" | "danger" | "success" | "warning" | "whatsapp";
  variant?: "filled" | "outlined" | "text";
  behavior?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: FC | ReactNode;
  endIcon?: FC | ReactNode;
  size?: "small" | "medium" | "large";
}

const Button: FC<ButtonProps> = ({
  type = "primary",
  variant = "filled",
  behavior = "button",
  children,
  className = "",
  onClick,
  disabled = false,
  loading = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  size = "medium",
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState<string>("auto");

  const baseStyles =
    "px-4 font-opensans font-medium rounded-md flex items-center justify-center focus:outline-none transition-all duration-300 ease-in-out whitespace-nowrap";

  const sizeStyles: { [key: string]: string } = {
    small: "h-8 text-sm",
    medium: "h-10 text-sm",
    large: "h-12 text-lg",
  };

  const typeStyles: { [key: string]: string } = {
    primary: "text-white bg-cyan-400 hover:bg-cyan-500",
    danger: "text-white bg-red-500 hover:bg-red-600",
    success: "text-white bg-green-500 hover:bg-green-600",
    warning: "text-black bg-yellow-500 hover:bg-yellow-600",
    whatsapp: "text-white bg-green-500 hover:bg-green-600",
  };

  const variantStyles: { [key: string]: { [key: string]: string } } = {
    filled: typeStyles,
    outlined: {
      primary: "border border-cyan-400 text-cyan-400 hover:bg-cyan-100",
      danger: "border border-red-500 text-red-500 hover:bg-red-100",
      success: "border border-green-500 text-green-500 hover:bg-green-100",
      warning: "border border-yellow-500 text-yellow-500 hover:bg-yellow-100",
      whatsapp: "border border-green-500 text-green-500 hover:bg-green-100",
    },
    text: {
      primary: "text-cyan-400 hover:bg-cyan-100",
      danger: "text-red-500 hover:bg-red-100",
      success: "text-green-500 hover:bg-green-100",
      warning: "text-yellow-500 hover:bg-yellow-100",
      whatsapp: "text-green-500 hover:bg-green-100",
    },
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonClass = classNames(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant][type],
    { [disabledStyles]: disabled || loading },
    className
  );

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(`${buttonRef.current.offsetWidth}px`);
    }
  }, [children]);

  const handleClick = useCallback(() => {
    if (onClick && !disabled && !loading) {
      onClick();
    }
  }, [onClick, disabled, loading]);

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      type={behavior}
      ref={buttonRef}
      style={{ width: loading ? buttonWidth : "auto" }}
    >
      {loading ? (
        <span className="flex justify-center items-center">
          <span className="w-5 h-5 border-2 border-t-transparent  border-white rounded-full animate-spin"></span>
        </span>
      ) : (
        <>
          {typeof StartIcon === "function" ? (
            <span className="pr-2">
              <StartIcon />
            </span>
          ) : (
            StartIcon
          )}
          <span className="flex-grow-0">{children}</span>
          {typeof EndIcon === "function" ? (
            <span className="pl-2">
              <EndIcon />
            </span>
          ) : (
            EndIcon
          )}
        </>
      )}
    </button>
  );
};

export default Button;
