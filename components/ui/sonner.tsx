'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

import { resolveSonnerTheme } from '@/lib/themes'
import { useTheme } from '@/components/theme-provider'

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme, theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={resolveSonnerTheme(theme, resolvedTheme) as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
