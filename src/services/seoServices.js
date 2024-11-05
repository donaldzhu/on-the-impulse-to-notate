import { SEO, SEO_TYPES, WEBSITE_SEO } from '../constants/seoConstants'

const getWebPageName = subpage => subpage ? `${SEO.NAME} - ${subpage}` : SEO.NAME

const getWebPageSchema = subpage => ({
  '@context': 'https://schema.org',
  '@type': SEO_TYPES.WEBPAGE,
  '@id': window.location.href,
  '@url': window.location.href,
  name: getWebPageName(subpage),
  image: 'https://notations.xyz/assets/01_Primary-Text/600/REF_001.webp',
  keywords: SEO.KEYWORDS,
  description: SEO.DESCRIPTION,
  isPartOf: WEBSITE_SEO,
})


const seoServices = {
  getWebPageName,
  getWebPageSchema
}

export default seoServices