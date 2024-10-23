import _, { compact } from 'lodash'
import { FRAGMENT_TYPES, VISUAL_ESSAY_TITLE } from '../../constants/apiConstants'
import { padNumber, quickArray, stringsAreEqual } from '../commonUtils'

class NodeData {
  constructor() {
    this.type = undefined
    this.imgNum = undefined
    this.imgLink = undefined
    this.sectionTitle = undefined
    this.pageNum = undefined
    this.artistLastName = undefined
    this.artistFirstName = undefined
    this.medium = undefined
    this.workDetails = undefined
    this.copyright = undefined
    this.text = undefined
    this.footnotes = undefined
    this.projects = undefined

    this.interview = undefined
    this.interviewPrefix = undefined

    this.imgLinks = []
    this.isExtra = undefined
  }

  get isText() {
    return this.type === FRAGMENT_TYPES.TEXT
  }

  get isInterview() {
    return this.type === FRAGMENT_TYPES.INTERVIEW
  }

  get isOrphan() {
    return this.type === FRAGMENT_TYPES.ORPHAN
  }

  get isVisualEssay() {
    return this.type === FRAGMENT_TYPES.VISUAL_ESSAY
  }

  getImgLinks() {
    const imgLinks = this.fullNumRange
      .map(num => this.getImgLink(num))
    return this.imgLinks = imgLinks.filter(l => l)
  }

  getImgLink(imgNum = this.imgNum) {
    if (this.isInterview)
      return `04_Interviews/Interview_${this.interviewPrefix}${imgNum}.webp`
    const folder = this.isText ? '01_Primary-Text' :
      this.isVisualEssay ?
        stringsAreEqual(this.sectionTitle, VISUAL_ESSAY_TITLE.BLUE_INSIGHTS) ?
          '02_Blue-Insights' :
          '03_Surface-Manipulation' :
        undefined
    if (folder) return `${folder}/REF_${padNumber(imgNum)}.webp`
  }


  getImgNodes(allData) {
    const sameTitle = (this.isInterview || !allData) ?
      [this] :
      allData.filter(data => data.sectionTitle === this.sectionTitle)

    const result = sameTitle.map((data) =>
      data.imgLinks.map((imgLink, i) =>
        Object.assign(new NodeData(), data, { imgNum: [data.fullNumRange[i]], imgLink })
      )
    ).flat()

    return result
  }

  get fullNumRange() {
    return this.imgNum.length === 1 ?
      [this.imgNum[0]] :
      quickArray(
        this.imgNum[1] - this.imgNum[0] + 1,
        i => this.imgNum[0] + i
      )
  }

  get isTextNode() {
    return this.text && !this.isOrphan
  }

  get isImgNode() {
    return !!this.imgLinks.length
  }
}

export default NodeData