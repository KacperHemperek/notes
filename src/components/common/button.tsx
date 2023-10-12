import { cn } from '~/utils/cn'
import { motion, MotionProps } from 'framer-motion'
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'

export function getButtonStyle(
  variant: ButtonVariant = 'primary',
  additionalStyles?: string
) {
  const variants = {
    primary:
      'text-slate-950 bg-slate-50 border-slate-50 hover:bg-slate-200 hover:border-slate-200',
    secondary:
      'text-slate-50 bg-transparent border-slate-50 hover:bg-slate-200 hover:border-slate-200 hover:text-slate-950',
    danger:
      'text-slate-50 bg-rose-600 border-rose-600 hover:bg-rose-700 hover:border-rose-700',
    warning:
      'bg-amber-500 border-amber-500 hover:bg-amber-600 hover:border-amber-600',
    success:
      'bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600',
  }

  return cn(
    'flex gap-2 items-center text-sm border justify-center rounded-md p-2 font-medium disabled:opacity-50 disabled:pointer-events-none transition-colors',
    variants[variant],
    additionalStyles
  )
}

type ButtonProps = {
  variant?: ButtonVariant
  className?: string
}

export function NotesButton({
  children,
  variant,
  className,
  ...props
}: ButtonProps & MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button className={getButtonStyle(variant, className)} {...props}>
      {children}
    </motion.button>
  )
}
