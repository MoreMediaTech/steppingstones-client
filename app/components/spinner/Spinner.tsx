const Spinner = ({ message, classes }: { message?: string, classes: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={` animate-spin ${classes} rounded-full border-b-4 border-[#00BFFF] p-2`} />
      <p className="px-2 text-center text-lg">{message}</p>
    </div>
  )
}

export default Spinner
