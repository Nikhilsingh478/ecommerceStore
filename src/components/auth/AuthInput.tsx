import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, type = "text", className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (show ? "text" : "password") : type;
    const inputId = id || `auth-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-11 rounded-xl border bg-background px-3.5 text-sm",
              "text-foreground placeholder:text-muted-foreground/70",
              "transition-all outline-none",
              "focus:ring-2 focus:ring-ring/40 focus:border-ring",
              error
                ? "border-destructive focus:ring-destructive/30 focus:border-destructive"
                : "border-input",
              isPassword && "pr-11",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-destructive mt-1">{error}</p>
        )}
      </div>
    );
  },
);
AuthInput.displayName = "AuthInput";

export default AuthInput;
