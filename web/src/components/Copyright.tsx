export function Copyright() {
  return (
    <a
      className="group cursor-pointer text-dynamic-sm font-semibold leading-relaxed"
      href="#"
    >
      <div className="flex items-center justify-center will-change-transform">
        <div className="pr-1">
          <span className="relative block leading-none transition-all duration-500 group-hover:rotate-[360deg]">
            ©
          </span>
        </div>

        <div className="relative overflow-hidden">
          <span className="relative inline-block pr-1 transition-all duration-500 group-hover:-translate-x-20">
            Code by
          </span>
          <span className="relative inline-block transition-all duration-500 group-hover:-translate-x-20">
            <span>Franklin</span>
            <span className=" absolute left-0 top-0 translate-x-[4.3rem] whitespace-nowrap pl-2">
              Ramos
            </span>
          </span>
        </div>
      </div>
    </a>
  )
}
