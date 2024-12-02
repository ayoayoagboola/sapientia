interface HeaderProps {
    title: string, 
    label: string, 
}; 

export const Header = ({
    title, 
    label,
}: HeaderProps) => {
  return (
    <div className="flex flex-col gap-y-1 m-2 items-center justify-center">
        <h1 className="font-bold text-3xl">
            {title}
        </h1>
        <p className="text-gray-500 font-normal text-sm">
            {label}
        </p>
    </div>
  )
}
