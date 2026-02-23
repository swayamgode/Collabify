import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-black text-white hover:bg-gray-800 border-none shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-[0.98]',
        secondary: 'bg-white text-black hover:bg-gray-50 border border-gray-100 shadow-sm active:scale-[0.98]',
        outline: 'bg-transparent border border-gray-200 text-foreground hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]',
        ghost: 'bg-transparent text-secondary hover:text-foreground hover:bg-black/[0.03] active:scale-[0.98]',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base font-bold',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button, cn };
