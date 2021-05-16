import React from 'react'
import { Image } from '@chakra-ui/react'
import LogoSvg from '../../assets/logo.svg'
import LogoWhiteSvg from '../../assets/logo-white.svg'

export const Logo: React.FC = () => {
  return <Image src={LogoSvg} />
}

export const LogoWhite: React.FC = () => {
  return <Image src={LogoWhiteSvg} />
}
