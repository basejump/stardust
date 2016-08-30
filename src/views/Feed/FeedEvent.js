import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createShorthand,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'
import FeedContent from './FeedContent'
import FeedLabel from './FeedLabel'

function FeedEvent(props) {
  const { children, className, date, extraImages, extraText, image, icon, meta, summary } = props
  const classes = cx(className, 'event')
  const rest = getUnhandledProps(FeedEvent, props)
  const ElementType = getElementType(FeedEvent, props)

  const hasContentProp = date || extraImages || extraText || meta || summary
  const contentProps = { date, extraImages, extraText, meta, summary }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedLabel, val => ({ icon: val }), icon)}
      {createShorthand(FeedLabel, val => ({ image: val }), image)}
      {hasContentProp && <FeedContent {...contentProps} />}
      {children}
    </ElementType>
  )
}

FeedEvent._meta = {
  name: 'FeedEvent',
  parent: 'Feed',
  type: META.TYPES.VIEW,
}

FeedEvent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content of the FeedEvent. */
  children: customPropTypes.every([
    customPropTypes.disallow([
      'content',
      'date',
      'extraImages',
      'extraText',
      'icon',
      'image',
      'meta',
      'summary',
    ]),
    PropTypes.node,
  ]),

  /** Classes that will be added to the FeedEvent className. */
  className: PropTypes.string,

  /** Shorthand for FeedDate. */
  date: FeedContent.propTypes.date,

  /** Shorthand for FeedExtra with prop images. */
  extraImages: FeedContent.propTypes.extraImages,

  /** Shorthand for FeedExtra with prop text. */
  extraText: FeedContent.propTypes.extraText,

  /** An event can contain icon label. */
  icon: customPropTypes.icon,

  /** An event can contain image label. */
  image: customPropTypes.image,

  /** Shorthand for FeedMeta. */
  meta: FeedContent.propTypes.meta,

  /** Shorthand for FeedSummary. */
  summary: FeedContent.propTypes.summary,
}

console.log(FeedEvent.propTypes)

export default FeedEvent
