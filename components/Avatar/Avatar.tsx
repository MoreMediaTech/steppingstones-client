import Image from "next/image"
import steppingstonesapplogo from '../../public/steppingstonesapplogo.png'

const Avatar = ({ imageUrl, classes }: { imageUrl: string, classes?: string}) => {
  return (
    <div
      className={`${classes} relative flex h-16 w-20 items-center justify-center rounded-md border border-[#3A0B99] bg-[#3A0B99] text-xl font-semibold text-white md:h-20 md:w-24`}
    >

          <Image
            src={!!imageUrl ? imageUrl : steppingstonesapplogo}
            alt={"User image or logo"}
            layout="fill"
            objectFit="cover"
          />
    </div>
  )
}

export default Avatar