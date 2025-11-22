import Image from "next/image"
import Link from "next/link"

function Logo() {
  return (
    <Link href='/' className='flex items-center gap-4 z-10'>
      <Image src='/logo.png' height='60' width='60' alt='The Wild Oasis logo' />
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </Link>
  )
}

export default Logo

/* 
Image component does the following:
1. It will automatically serve correctly sized images in modern formats like WebP (on demand)
2. Image component prevent layout shifts because it requires width and height to be specified
3. Lazy loads the images
 */
