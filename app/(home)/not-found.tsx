import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex h-screen items-center justify-center overflow-hidden  text-gray-900 dark:text-gray-100">
      <div className="grid place-content-center">
        <h2 className="my-5 text-6xl">Not Found</h2>
        <p className="mb-5 text-4xl text-gray-500 dark:text-gray-300">
          Could not find requested resource
        </p>
        <p className="text-4xl text-gray-500 dark:text-gray-300">
          View{' '}
          <Link href="/" className="underline">
            Home
          </Link>
        </p>
      </div>
    </section>
  )
}
