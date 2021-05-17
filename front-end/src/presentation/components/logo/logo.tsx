import React from 'react'
import { Image } from '@chakra-ui/react'
import LogoSvg from '../../assets/logo.svg'
import LogoWhiteSvg from '../../assets/logo-white.svg'

export const Logo: React.FC = ({ ...props }) => {
  return <Image src={LogoSvg} {...props} />
}

export const LogoWhite: React.FC = ({ ...props }) => {
  return <Image src={LogoWhiteSvg} {...props} />
}
