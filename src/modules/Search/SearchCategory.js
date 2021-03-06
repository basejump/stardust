import React, { PropTypes } from 'react'
import cx from 'classnames'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'

const defaultRenderer = ({ name }) => name

function SearchCategory(props) {
  const { active, className, children, renderer } = props
  const classes = cx(
    useKeyOnly(active, 'active'),
    'category',
    className
  )
  const rest = getUnhandledProps(SearchCategory, props)
  const ElementType = getElementType(SearchCategory, props)

  return (
    <ElementType {...rest} className={classes}>
      <div className='name'>
        {renderer ? renderer(props) : defaultRenderer(props)}
      </div>
      {children}
    </ElementType>
  )
}

SearchCategory._meta = {
  name: 'SearchCategory',
  parent: 'Search',
  type: META.TYPES.MODULE,
}

SearchCategory.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Should be <Search.Result /> components. */
  children: PropTypes.node,

  /** Classes to add to the className. */
  className: PropTypes.string,

  /** Display name. */
  name: PropTypes.string,

  /**
   * A function that returns the category contents.
   * Receives all SearchCategory props.
   */
  renderer: PropTypes.func,

  /** Array of Search.Result props */
  results: PropTypes.array,
}

export default SearchCategory
