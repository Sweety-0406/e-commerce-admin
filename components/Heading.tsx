'use client'
interface HeadingProps{
    title:string,
    subtitle:string
}

const Heading:React.FC<HeadingProps> = ({
    title,
    subtitle
}) =>{
    return(
        <div>
            <div className="font-bold text-3xl">
                {title}
            </div>
            <div className="text-sm text-slate-500">
                {subtitle}
            </div>
        </div>
    )
}

export default Heading