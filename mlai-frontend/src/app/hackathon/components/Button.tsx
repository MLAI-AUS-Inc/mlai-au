import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function Button({ className, ...props }: ButtonProps) {
  // Default className for Teal button
  const tealClassName = clsx(
    'inline-flex justify-center rounded-md bg-teal-400 p-3 text-sm font-semibold text-black hover:bg-teal-200 transition duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:text-white/70 transition duration-150',
    className,
  )

  // Additional className for the complementary color button (deep orange-red)
  const complementaryClassName = clsx(
    'inline-flex justify-center rounded-md bg-amber-500 p-3 text-sm font-semibold text-black hover:bg-amber-200 transition duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-red active:text-white/70 transition duration-150',
    className,
  )

  // Choose className based on a prop, for example
  const buttonClassName = props.color === 'teal' ? tealClassName : complementaryClassName;

  return typeof props.href === 'undefined' ? (
    <button className={buttonClassName} {...props} />
  ) : (
    <Link className={buttonClassName} {...props} />
  )
}
