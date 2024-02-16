import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center rounded-md bg-teal-400 p-3 text-sm font-semibold text-black hover:bg-teal-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:text-white/70 transition duration-150',
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
