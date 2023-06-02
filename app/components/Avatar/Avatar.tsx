import Image from 'next/image'
import steppingstonesapplogo from '../../public/steppingstonesapplogo.png'

const Avatar = ({
  imageUrl,
  classes,
  imgSize,
}: {
  imageUrl: string
  classes?: string
  imgSize?: string
}) => {
  return (
    <div
      className={`${classes} relative flex items-center justify-center rounded-full border border-[#3A0B99] bg-white p-4 text-xl font-semibold text-white `}
    >
      <Image
        src={!!imageUrl ? imageUrl : steppingstonesapplogo}
        alt={'User image or logo'}
        className={`rounded-full ${imgSize}`}
        fill
        style={{
          objectFit: 'cover',
        }}
        sizes="100%"
      />
    </div>
  )
}

export default Avatar
