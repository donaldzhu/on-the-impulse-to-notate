import ImgView from '../components/views/imgView'
import MixedView from '../components/views/mixedview/mixedView'
import TextView from '../components/views/textView'

export const FRAGMENT_ID_PREFIX = 'fragment-'

export const views = {
  text: { text: 'Text', component: TextView, url: 'text' },
  image: { text: 'Image', component: ImgView, url: 'image' },
  mixed: { text: 'Text+Image', component: MixedView, url: 'text-image' },
}
