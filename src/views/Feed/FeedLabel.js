import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createHTMLImage,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'
import { Icon } from '../../elements'

function FeedLabel(props) {
  const { children, className, content, icon, image } = props
  const classes = cx(className, 'label')
  const rest = getUnhandledProps(FeedLabel, props)
  const ElementType = getElementType(FeedLabel, props)

  if (children) {
    return <ElementType {...rest} className={classes}>{children}</ElementType>
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {Icon.create(icon)}
      {createHTMLImage(image)}
    </ElementType>
  )
}

FeedLabel._meta = {
  name: 'FeedLabel',
  parent: 'Feed',
  type: META.TYPES.VIEW,
}

FeedLabel.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content of the FeedLabel. */
  children: customPropTypes.every([
    customPropTypes.disallow(['icon', 'image']),
    PropTypes.node,
  ]),

  /** Primary content of the FeedLabel. */
  content: customPropTypes.shorthand,

  /** Classes that will be added to the FeedLabel className. */
  className: PropTypes.string,

  /** An event can contain icon label. */
  icon: customPropTypes.icon,

  /** An event can contain image label. */
  image: customPropTypes.image,
}

export default FeedLabel
