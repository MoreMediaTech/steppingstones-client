'use client'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
// mirror the props of next/link component
type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>
type ScrollLinkProps = LinkProps &
  PropsWithChildren &
  AnchorProps & {
    path: string
    setActivePath: React.Dispatch<React.SetStateAction<string>>
  }
// component definition
const ScrollLink = ({
  children,
  path,
  setActivePath,
  ...props
}: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    //remove everything before the hash
    const targetId = e.currentTarget.href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: 'smooth' })
    if (path === targetId || path === 'hero' || path === '/enquire' ) {
      setActivePath(path)
    }
  }
  return (
    <Link {...props} onClick={handleScroll}>
      {children}
    </Link>
  )
}
export default ScrollLink
