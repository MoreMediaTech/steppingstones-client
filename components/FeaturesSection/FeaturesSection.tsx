import React from 'react'

const FeaturesSection = () => {
  return (
    <section id="features" className="space-y-8 pt-24 pb-8">
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-medium text-primary-dark-100">
          Features
        </h1>
        <h3 className="font-base text-center text-xl text-[#00DCB3]">
          Practical support for business without information overload.
        </h3>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Latest information</h3>
          <p className="font-thin">
            Our team will work with key stakeholders to provide current
            information and resources.
          </p>
        </div>
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Economic Data</h3>
          <p className="font-thin">
            Updated Monthly, national, regional and locally, we will have
            employment figures, investment and more
          </p>
        </div>
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Support for Startups</h3>
          <p className="font-thin">
            Startups are vital for economic recovery and need as much support as
            possible to thrive. We are happy to have a dedication section for
            them. Have a service for startups? Let us know in our information
            submission form.
          </p>
        </div>
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Growing a Business</h3>
          <p className="font-thin">
            Thinking of expanding your business or looking for a more suitable
            location geographically? You will be well informed about the regions
            we cover before making business decisions.
          </p>
        </div>
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Topical Issues</h3>
          <p className="font-thin">
            The latest news that could affect your business. Our team will work
            with key stakeholders to provide current information and resources.
          </p>
        </div>
        <div className="space-y-4 p-2">
          <h3 className="font-semibold">Business Spotlight</h3>
          <p className="font-thin">
            Once a week we will spotlight a new business or great resource in
            your region. Got a new business support service, trial, grant
            opportunity or new to the area? Simply let us know in the Spotlight
            application section on the app.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection