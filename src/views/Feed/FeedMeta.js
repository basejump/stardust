import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createShorthand,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'
import FeedLike from './FeedLike'

function FeedMeta(props) {
  const { children, className, like, content } = props
  const classes = cx(className, 'meta')
  const rest = getUnhandledProps(FeedMeta, props)
  const ElementType = getElementType(FeedMeta, props)

  if (children) {
    return <ElementType {...rest} className={classes}>{children}</ElementType>
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedLike, val => ({ content: val }), like)}
      {content}
    </ElementType>
  )
}

FeedMeta._meta = {
  name: 'FeedMeta',
  parent: 'Feed',
  type: META.TYPES.VIEW,
}

FeedMeta.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content of the FeedMeta. */
  children: customPropTypes.every([
    customPropTypes.disallow(['meta']),
    PropTypes.node,
  ]),

  /** Classes that will be added to the FeedMeta className. */
  className: PropTypes.string,

  /** Shorthand for FeedLike. */
  like: FeedLike.propTypes.content,

  /** Primary content of the FeedMeta. */
  content: customPropTypes.shorthand,
}

export default FeedMeta
