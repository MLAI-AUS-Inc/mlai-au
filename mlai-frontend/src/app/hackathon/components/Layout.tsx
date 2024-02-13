import Header from "./Header"
import styles from '../AnimatedBackground.module.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {/* Animated background with absolute positioning and a z-index lower than the content */}
    {/* <div className={`${styles.animatedBackground}`} /> */}
    <div className='bg-gray-900' />
      <Header />
      <main className="flex-auto">{children}</main>
    </>
  )
}
