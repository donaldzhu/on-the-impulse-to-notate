import { SEO, SEO_TYPES, WEBSITE_SEO } from '../constants/seoConstants'

const getWebPageName = subpage => subpage ? `${SEO.NAME} - ${subpage}` : SEO.NAME

const getWebPageSchema = subpage => ({
  '@context': 'https://schema.org',
  '@type': SEO_TYPES.WEBPAGE,
  '@id': window.location.href,
  '@url': window.location.href,
  name: getWebPageName(subpage),
  keywords: SEO.KEYWORDS,
  description: SEO.DESCRIPTION,
  isPartOf: WEBSITE_SEO,
  primaryImageOfPage: 'assets/01_Primary-Text/600/REF_001.webp'
})


const seoServices = {
  getWebPageName,
  getWebPageSchema
}

export default seoServices