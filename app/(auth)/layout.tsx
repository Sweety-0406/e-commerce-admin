function AuthLayout(
    {children}:{children : React.ReactNode}
){
    return (
        <div className="flex items-center justify-center h-full mt-28">
            {children}
        </div>
    )
}

export default AuthLayout