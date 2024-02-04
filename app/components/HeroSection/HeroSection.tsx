"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@components/ui/button";
import { Carousel } from "@components/ImageTickerCarousel";

import { contentSelector } from "@app/global-state/features/content/contentSlice";
import { useAppSelector } from "@app/global-state/hooks";
import { PartialFeedContentSchema } from "@models/FeedContent";

const imageVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0 },
  exit: { y: "100%" },
};
const imageVariants2 = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0 },
  exit: { x: "90%" },
};
const imageVariants3 = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0 },
  exit: { x: "100%" },
};

export default function HeroSection() {
  const { publicFeed } = useAppSelector(contentSelector);

  return (
    <>
      <section
        id="hero"
        className="relative flex h-screen items-center justify-center  p-4 md:h-[800px]"
      >
        <div className="absolute h-full w-full bg-cover bg-center bg-no-repeat">
          <div className="relative h-full w-full">
            <Image
              src={"/sohee-kim-NGeVlMIaFsg-unsplash.jpg"}
              alt="image by Sohee Kim"
              quality={50}
              fill
              priority
            />
            <div
              id="blackOverlay"
              className="absolute h-full w-full bg-black opacity-60"
            ></div>
          </div>
        </div>
        <div className="relative flex max-w-screen-2xl items-center justify-center sm:container sm:mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:gap-2 md:grid-cols-5">
            <div className="relative col-span-2 mt-8 flex flex-col justify-start space-y-4 px-4 py-8 sm:w-2/3  md:ml-12 md:w-full lg:-ml-12 xl:-ml-24">
              <h1
                aria-label="Empowering Business for Success"
                data-test="hero-title"
                className="text-3xl text-textLight sm:text-4xl md:text-5xl"
              >
                Empowering Business for Success
              </h1>
              <p
                aria-label="Your Gateway to Growth and Support"
                data-test="hero-text"
                className="font-semibold text-accent-light-600"
              >
                Your Gateway to Growth and Support
              </p>
              <Button
                aria-label="Get Started"
                data-test="hero-button"
                type="button"
                className="w-1/2 sm:w-1/3"
                onClick={() => null}
              >
                Get Started
              </Button>
            </div>
            <div className="relative z-50 col-span-3">
              <motion.div
                initial="initial"
                animate="animate"
                whileInView={{ opacity: 1 }}
                exit="exit"
                variants={imageVariants}
                transition={{ type: "spring", duration: 5 }}
                className="relative h-full w-full rounded-md "
              >
                <Image
                  src={"/dashboard.png"}
                  alt="image of Stepping Stones admin dashboard"
                  sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
                  quality={50}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="h-auto w-full rounded-md"
                  height={1024}
                  width={1224}
                  priority
                />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                whileInView={{ opacity: 1 }}
                exit="exit"
                variants={imageVariants2}
                transition={{ type: "spring", duration: 5 }}
                className="absolute -bottom-5 left-2 z-50 mr-4 h-[70px] w-1/3 rounded-md sm:-left-12 sm:h-[180px] sm:w-1/2"
              >
                <Image
                  src={"/data-graph2.png"}
                  alt="image of Stepping Stones data graph two"
                  sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
                  quality={50}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="h-auto w-full rounded-md"
                  height={1024}
                  width={1224}
                  priority
                />
              </motion.div>
              <motion.div
                initial="initial"
                animate="animate"
                whileInView={{ opacity: 1 }}
                exit="exit"
                variants={imageVariants3}
                transition={{ type: "spring", duration: 5 }}
                className="absolute -right-3 top-16 z-50 flex h-[60px] w-1/3 items-center justify-center rounded-md   sm:-right-24 sm:top-32 sm:h-[120px]"
              >
                <Image
                  src={"/data-graph1.png"}
                  alt="image of Stepping Stones data graph two"
                  sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
                  quality={50}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="h-auto w-full rounded-md"
                  height={1024}
                  width={1224}
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Carousel feedContent={publicFeed as PartialFeedContentSchema[]} />
    </>
  );
}
