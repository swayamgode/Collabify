import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = React.createContext<{
    value?: string
    onValueChange?: (value: string) => void
} | null>(null)

export function SelectProvider({
    children,
    value,
    onValueChange
}: {
    children: React.ReactNode
    value?: string
    onValueChange?: (value: string) => void
}) {
    return (
        <Select.Provider value={{ value, onValueChange }}>
            {children}
        </Select.Provider>
    )
}

export function SelectTrigger({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}>
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
    )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
    const context = React.useContext(Select)
    return <span>{context?.value || placeholder}</span>
}

export function SelectContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
            className
        )}>
            <div className="p-1">{children}</div>
        </div>
    )
}

export function SelectItem({ value, children }: { value: string, children: React.ReactNode }) {
    const context = React.useContext(Select)
    return (
        <div
            onClick={() => context?.onValueChange?.(value)}
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
            {children}
        </div>
    )
}

// Re-exporting for simpler usage in the page
export { SelectProvider as Select }
