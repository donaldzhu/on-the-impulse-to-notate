export const SEO_TYPES = {
  WEBSITE: 'WebSite',
  WEBPAGE: 'WebPage',
  IMAGE_OBJECT: 'ImageObject'
}


export const SEO = {
  NAME: 'On the Impulse to Notate',
  AUTHOR: 'Lydia Chodosh',
  CONTRIBUTOR: 'Donald Zhu',
  DESCRIPTION: 'On the Impulse to Notate is a digital translation of the printed catalog of the same name. Composed in fragments — written and collected, designed and curated — this catalog resists linear narrative formulas to favor an open poetic syntax. Here, the designer reads and translates stories spatially, frequently shifting their frames.',
  CREDIT: 'This website is a direct translation of the book of the same name, designed and written by Lydia Chodosh in partial fulfillment of the RISD Graphic Design MFA. © 2024',
  EDUCATIONAL_USE: 'Masters of Fine Arts',
  IS_BASED_ON: 'https://lydiachodosh.com/on-the-impulse-to-notate',
  ORG: 'Rhode Island School of Design (RISD)',
  KEYWORDS: [
    'RISD MFA',
    'RISD Graphic Design',
    'RISD Thesis',
    'RISD Masters',
    'Graphic Design Notations',
    'Graphic Design MFA'
  ]
}


export const WEBSITE_SEO = {
  '@type': SEO_TYPES.WEBSITE,
  author: SEO.AUTHOR,
  contributor: SEO.CONTRIBUTOR,
  creditText: SEO.CREDIT,
  educationalUse: SEO.EDUCATIONAL_USE,
  isBasedOn: SEO.IS_BASED_ON,
  sourceOrganization: SEO.ORG,
  name: SEO.NAME,
  description: SEO.DESCRIPTION,
}