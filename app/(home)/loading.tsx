import Loader from "@components/Loader";


export default function Loading() {
  return (
    <section className="flex flex-col h-screen items-center justify-center w-full">
      <Loader  className="w-12 h-12" />
    </section>
  )
}
