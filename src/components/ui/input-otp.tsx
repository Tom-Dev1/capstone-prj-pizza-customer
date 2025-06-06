
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
    ({ className, containerClassName, ...props }, ref) => (
        <OTPInput
            ref={ref}
            containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
            className={cn("disabled:cursor-not-allowed", className)}
            {...props}
        />
    ),
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)

    // Make sure the context and slots exist before accessing
    if (!inputOTPContext || !inputOTPContext.slots || !inputOTPContext.slots[index]) {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 items-center justify-center border text-sm transition-all rounded-sm ",
                    className,
                )}
                {...props}
            />
        )
    }

    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center ml-1 border text-sm transition-all rounded-md  ",
                isActive && "z-10 ring-2 ring-green-300 ring-offset-slate-400",
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
    ({ ...props }, ref) => (
        <div ref={ref} role="separator" {...props}>
            <Minus className="w-2 ml-1 h-2" />
        </div>
    ),
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

