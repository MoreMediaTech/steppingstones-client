'use client'
import React from 'react'

import { Blockquote } from '@components/mantine-components'
import { Button } from '@components/ui/button'

export function SectionOne() {
  
  return (
    <section className=" flex h-[500px] w-full items-center justify-center bg-primary-light-50/50 px-2 py-6 dark:bg-background  md:p-4 md:py-0">
      <div className="container mx-auto">
        <div className="grid h-full w-full grid-cols-1 gap-4 md:gap-12 md:grid-cols-2">
          <div className="col-span-1 video-container place-items-center md:mb-0">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Hj8dWDd1HbM?start=70"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="col-span-1 flex w-full items-center justify-center py-4 md:py-0">
            <Blockquote cite="- Sky News" className="w-full">
              <div className="flex w-full flex-col justify-start space-y-6">
                <p className="font-montserrat text-sm font-semibold">
                  Apprentice star and chair of West Ham Football Club, Baroness
                  Karren Brady, says more needs to be done to help UK small
                  businesses, after a report found 26% fear they could be forced
                  to cease trading.
                </p>
                <p className="font-montserrat text-sm font-semibold">
                  Baroness Brady says many small business owners are facing
                  challenging conditions, such as payment delays and high energy
                  bills, and called for better support for the sector, which is
                  responsible for contributing £1.4 trillion to the UK economy.
                </p>
                {/* <Button
                  type="button"
                  variant="outline"
                  className=" w-1/3 border-primary-dark-200 dark:border-primary-light-200"
                >
                  <a
                    target="_blank"
                    href="https://www.youtube.com/embed/Hj8dWDd1HbM"
                  >
                    Click to watch
                  </a>
                </Button> */}
              </div>
            </Blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
