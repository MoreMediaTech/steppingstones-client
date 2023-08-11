import React from 'react'
import { Metadata } from 'next'

// Static metadata
export const metadata: Metadata = {
  title: 'Stepping Stones - Site Disclaimer',
}
 

export default function SiteDisclaimer() {
  return (
    <section className="relative mt-24 bg-slate-50 py-8">
      <section className="mx-4 space-y-4 py-4 text-justify text-sm font-thin md:container md:mx-auto md:max-w-screen-md md:py-8">
        <h1 className="text-lg font-bold">
          STEPPING STONES, SOLUTIONS FOR BUSINESS APP DISCLAIMER NOTICE
        </h1>
        <h2 className="font-semibold">Last updated July 12, 2022</h2>
        <h2 className="font-semibold">
          Website Disclaimer of SteppingStonesApp.com
        </h2>
        <p>Thank you for visiting the Stepping Stones.</p>
        <p>
          Please note that the information provided on SteppingStonesApp.com and
          other related web properties are for informational purposes only.
        </p>
        <p>
          The information is provided by SteppingStonesApp.com and whilst we
          endeavor to keep the information up-to-date and correct, we make no
          representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, suitability or availability
          with respect to the website or the information, products, services, or
          related graphics contained on the website for any purpose. Any
          reliance you place on such information is therefore strictly at your
          own risk.
        </p>
        <p>
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of
          or in connection with the use of this website.
        </p>
        <p>
          Through this website you are able to link to other websites which are
          not under the control of SteppingStonesApp.com. We have no control
          over the nature, content and availability of those websites. The
          inclusion of any links does not necessarily imply a recommendation or
          endorse the views expressed within them.
        </p>
        <p>
          Every effort is made to keep the website up and running smoothly.
          However, Stepping Stones takes no responsibility for and will not be
          liable for the website being temporarily unavailable due to technical
          issues beyond our control.
        </p>
        <p>
          Our Website is provided by More Media Tech International for Stepping
          Stones on an "AS IS" basis.
        </p>
        <p>
          Stepping Stones makes no representations or warranties of any kind,
          express or implied as to the operation of the site, the information,
          content, materials or products included on the site.
        </p>
        <p>
          To the full extent permissible by applicable law, Stepping Stones
          disclaims all warranties, express or implied, including, but not
          limited to, the implied warranties and/or conditions of
          merchantability or satisfactory quality and fitness for a particular
          purpose and non-infringement.
        </p>
        <p>
          Stepping Stones will not be liable for any damages of any kind arising
          from the use of the site, including, but not limited to direct,
          indirect, incidental, punitive and consequential damages.
        </p>
        <p>
          Stepping Stones does not warrant that the site, or the server that
          makes it available, is free of viruses or other harmful components.
        </p>
      </section>
    </section>
  )
}

