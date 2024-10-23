import { useMediaQuery } from '@uidotdev/usehooks'
import { MOBILE_QUERY } from '../utils/sizeUtils'


const useIsMobile = () =>
  useMediaQuery(`only screen and (${MOBILE_QUERY})`)

export default useIsMobile