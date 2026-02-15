import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as SingleToast } from './SingleToast.vue'
export { default as Toast } from './Toast.vue'

export const toastVariants = cva(
  'pointer-events-auto w-full rounded-lg border shadow-md transition-all flex items-start gap-3 p-4 text-sm',
  {
    variants: {
      variant: {
        default:
          'border-border bg-card text-card-foreground',
        success:
          'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300',
        destructive:
          'border-destructive/50 bg-destructive/10 text-destructive',
        warning:
          'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type ToastVariants = VariantProps<typeof toastVariants>
