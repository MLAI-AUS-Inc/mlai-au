export default function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-2/3 m-auto border-t border-gray-300" />
      </div>
    </div>
  )
}
