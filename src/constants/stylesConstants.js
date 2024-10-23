import Size from '../utils/helpers/size'

export const FONT_FAMILIES = {
  APERCU: '"Apercu", sans-serif',
  APERCU_MONO: 'Apercu Mono, Monospace',
  APERCU_COND: 'Apercu Condensed Pro, sans-serif',
  BRADFORD: 'Bradford LL, serif'
}

export const FONT_SIZES = {
  SMALL: new Size(12),
  REGULAR: new Size(15),
  LEADING_S: new Size(15),
  LEADING_M: new Size(18),
  LEADING_L: new Size(20),
}

export const FONT_WEIGHTS = {
  BOLD: 500
}

export const FONT_SIZES_RESPONSIVE = {
  SMALL: [10.75, 11],
  REGULAR: [14, 15],
  TEXT_HEADER: [14.25, 15],
  LARGE: [15.75, 16, 16.25, 16.5],
  LEADING_XS: [12.75, 13],
  LEADING_S: [14, 15],
  LEADING_M: [17, 18],
  LEADING_DL: [19.75, 20, 20.25, 20.5],

  // mobile
  MOBILE_REGULAR: [17, 19],
  MOBILE_LEADING: [23.5, 25.5],
  TEXT_HEADER_MOBILE: [16.5, 18],
  LEADING_M_MOBILE: [22, 24.5],
}

export const COLORS = {
  BROWN: '#9A6A12',
  BEIGE: '#F7F3EC',
  BLUE: '#3180C6',

  BEIGE_VISUAL: '#EBE1D0',
  BLUE_VISUAL: '#CEE1F1',
}

const PAGE_MARGIN_MOBILE = new Size(25)
export const SIZES = {
  GRID_COUNT_DESKTOP: 9,
  GRID_COUNT_MOBILE: 5,

  PAGE_MARGIN_DESKTOP: new Size(30),
  PAGE_MARGIN_MOBILE,
  ELEM_MARGIN_DESKTOP: new Size(20),
  ELEM_MARGIN_MOBILE: new Size(10),

  UNDERLINE_OFFSET: new Size(6),

  OPENED_INDEX_LEFT_VALUE: new Size({ vw: 30 }),
  CLOSED_INDEX_LEFT_VALUE: new Size({ vw: 93 }),
  INDEX_STICKY_TOP_DESKTOP: new Size({ rem: 11.25, vh: 20 }),
  INDEX_STICKY_TOP_MOBILE: new Size({ rem: 7.5, vh: 10 }),
  INDEX_ARTIST_WIDTH: '35%',
  INDEX_MEDIUM_WIDTH: '25%',
  INDEX_PAGE_NUM_WIDTH: new Size(100),
  ARROW_PADDING: new Size(4),

  HEADER_INNER_MARGIN: new Size(12),
  FIGURE_MARGIN_TOP: new Size(10),

  ORDERED_COL_TOP_PADDING: new Size(45),

  MIXED_VIEW_FIRST_PADDING_TOP: new Size(250),
  MIXED_VIEW_PADDING_TOP: new Size(400),
  MIXED_VIEW_PADDING_TOP_MOBILE: new Size(150),
  MIXED_VIEW_INTERVIEW_PADDING_TOP: new Size(30),
  MIXED_VIEW_INTERVIEW_PADDING_TOP_MOBILE: new Size(75),
  MIXED_VIEW_PADDING_BOTTOM: new Size(150),
  MIXED_VIEW_FIGURE_MARGIN: new Size(15),
  MIXED_VIEW_TEXT_PADDING: new Size(40),

  CITATION_MAX_WIDTH: new Size(300),
  CITATION_PADDING: new Size(10),
  CITATION_OFFSET: new Size(20),

  CURSOR: new Size(30),

  // mobile
  HEADER_BUTTON_PADDING: new Size(5),
  HEADER_BARS_HEIGHT: new Size(12.5),
  PAGE_MARGIN_TOP: FONT_SIZES.LEADING_S.add(PAGE_MARGIN_MOBILE.mult(3)),
  PAGE_MAX_WIDTH: new Size(650),
  IMG_MAX_WIDTH: new Size(650),
  FIGURE_MARGIN_TOP_MOBILE: new Size(11.5),
  VISUAL_ESSAY_SPACE_COMPENSATION_MULTIPLIER: 1.25
}

export const SIZES_RESPONSIVE = {
  TEXT_WIDTH: [270, 320, 370],
  TEXT_PADDING: [15, 17.5, 20],
  TEXT_HEADER_MARGIN: [25, 30],
  IMG_VIEW_FIGURE_SIZE: [85, 100, 115],
  ORDERED_COL_GAP: [15, 18],
  MIXED_VIEW_SECTION_WIDTH: [450, 475, 500],
  MIXED_VIEW_FIGURUE_WIDTH: [210, 230, 300],
  MIXED_VIEW_FIGURUE_HEIGHT: [230, 245, 330],
  INDEX_TAB_FIGURE_SIZE: [200, 225, 250],
  CITATION_WIDTH: [250, 275],
}

export const TIMINGS = {
  ORDER: 500,
  NODE_SCALE: 300,
  MIXED_FIGURE_OPACITY: 125,
  INDEX_SLIDE: 600,
  NODE_MAX_DELAY: 15000
}

export const CLS_ID = {
  TEXT_NODE: 'text-node',
  MAIN: 'main'
}

const createSrcSetSizes = (length, interval) =>
  Array(length).fill(interval).map((size, i) => size * (1 + i))
export const IMG_SRCSET = createSrcSetSizes(5, 150)
export const VISUAL_ESSAY_SRCSET = createSrcSetSizes(8, 125)

export const HYPHEN = {
  BEFORE: 4,
  AFTER: 4,
  MIN_LENGTH: 8,
  LIMIT_ZONE: '10%',
  LIMIT_LINES: 2
}