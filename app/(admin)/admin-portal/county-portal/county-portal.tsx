export function CountyPortal() {
  // const totalCountyButtonSlides = Math.ceil(counties?.length! / 12)

  // function goToNextPage() {
  //   setCurrentPage((page) => page + 1)
  //   if (currentPage >= totalCountyButtonSlides) {
  //     setCurrentPage(1)
  //   }
  // }
  // function goToPreviousPage() {
  //   setCurrentPage((page) => page - 1)
  //   if (currentPage <= 1) {
  //     setCurrentPage(totalCountyButtonSlides)
  //   }
  // }
  // const getPaginatedData = () => {
  //   const startIndex = currentPage * 12 - 12
  //   const endIndex = startIndex + 12
  //   return counties?.slice(startIndex, endIndex)
  // }

  return (
    <section className="mx-auto flex max-w-screen-md items-center justify-center  md:py-28">
      <div className="flex flex-col space-y-2 text-center">
        <h1>Welcome to the County Portal.</h1>
        <h3>Please select a county from the list</h3>
      </div>
    </section>
  )
}
