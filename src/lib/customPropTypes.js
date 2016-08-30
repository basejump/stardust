import { PropTypes, isValidElement } from 'react'
import _ from 'lodash/fp'

const typeOf = (...args) => Object.prototype.toString.call(...args)

/**
 * Ensure a component can render as a give prop value.
 */
export const as = (...args) => PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
])(...args)

/**
 * Ensures a prop is an element of a given type.
 * @param {String[]} type An HTML tag name string or component function.
 */
export const elementOfType = (type) => {
  // TODO: handle use in arrayOf/objectOf where args are
  // propValue, key, componentName, location, propFullName
  // propValue then is the array/object
  return (props, propName, componentName) => {
    if (!(typeof type === 'function' || typeof type === 'string')) {
      throw new Error([
        'Invalid argument supplied to elementOfType, expected a string or function.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }
    const propValue = props[propName]
    const typeName = typeof type === 'string' ? type : _.get(type, '_meta.name', type.constructor.name)
    const propType = typeof propValue === 'string' ? propValue : _.get(propValue, 'type')

    if (!isValidElement(propValue)) {
      return new Error(
        `\`${propName}\` prop in \`${componentName}\` must a valid ReactElement, got: ${typeOf(propValue)}.`,
      )
    }

    if (typeOf(propValue) !== typeOf(type) || !_.isMatch({ type }, propValue)) {
      return new Error(
        `\`${propName}\` prop in \`${componentName}\` must be of type \`${typeName}\`, got: ${typeOf(propValue)}.`,
      )
    }
  }
}

/**
 * Disallow other props form being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */
export const disallow = disallowedProps => {
  return (props, propName, componentName) => {
    if (!Array.isArray(disallowedProps)) {
      throw new Error([
        'Invalid argument supplied to disallow, expected an instance of array.'
          ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''))
    }

    // skip if prop is undefined
    if (props[propName] === undefined) return

    // find disallowed props with values
    const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
      if (props[disallowedProp] !== undefined) {
        return [...acc, disallowedProp]
      }
      return acc
    }, [])


    if (disallowed.length > 0) {
      console.log(propName, props[propName], _.flattenDeep(_.zip(disallowed, _.map(d => props[d])(disallowed))))
      return new Error([
        `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join('`, `')}\`.`,
        'They cannot be defined together, choose one or the other.',
      ].join(' '))
    }
  }
}

/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const every = (validators) => {
  return (props, propName, componentName, ...rest) => {
    if (!Array.isArray(validators)) {
      throw new Error([
        'Invalid argument supplied to every, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }

    const errors = _.flow(
      _.map(validator => {
        if (typeof validator !== 'function') {
          throw new Error(
            `every() argument "validators" should contain functions, found: ${typeOf(validator)}.`
          )
        }
        return validator(props, propName, componentName, ...rest)
      }),
      _.compact
    )(validators)

    // we can only return one error at a time
    return errors[0]
  }
}

/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const some = (validators) => {
  return (props, propName, componentName, ...rest) => {
    if (!Array.isArray(validators)) {
      throw new Error([
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }

    const errors = _.compact(_.map(validators, validator => {
      if (!_.isFunction(validator)) {
        throw new Error(
          `some() argument "validators" should contain functions, found: ${typeOf(validator)}.`
        )
      }
      return validator(props, propName, componentName, ...rest)
    }))

    // fail only if all validators failed
    if (errors.length === validators.length) {
      const error = new Error('One of these validators must pass:')
      error.message += '\n' + _.map(errors, (err, i) => (`[${i + 1}]: ${err.message}`)).join('\n')
      return error
    }
  }
}

/**
 * Ensure a validator passes only when a component has a given propsShape.
 * @param {object} propsShape An object describing the prop shape.
 * @param {function} validator A propType function.
 */
export const givenProps = (propsShape, validator) => {
  return (props, propName, componentName, ...rest) => {
    throw new Error('TODO val, key is not supported in fp')
    const shouldValidate = _.every((val, key) => {
      console.log('givenProps', val, key)
      // require propShape validators to pass or prop values to match
      return typeof val === 'function' ? !val(props, key, componentName, ...rest) : val === props[propName]
    })(propsShape)

    if (!shouldValidate) return

    if (!_.isPlainObject(propsShape)) {
      throw new Error([
        'Invalid argument supplied to givenProps, expected an object.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }

    if (typeof validator !== 'function') {
      throw new Error([
        'Invalid argument supplied to givenProps, expected a function.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }

    const error = validator(props, propName, componentName, ...rest)

    if (error) {
      // poor mans shallow pretty print, prevents JSON circular reference errors
      const prettyProps = `{ ${_.map(_.pick(props, _.keys(propsShape)), (val, key) => {
        let value = val
        if (typeof val === 'string') value = `"${val}"`
        else if (Array.isArray(val)) value = `[${val.join(', ')}]`
        else if (_.isObject(val)) value = '{...}'

        return `${key}: ${value}`
      }).join(', ')} }`

      error.message = `Given props ${prettyProps}: ${error.message}`
      return error
    }
  }
}

/**
 * Define prop dependencies by requiring other props.
 * @param {string[]} requiredProps An array of required prop names.
 */
export const demand = (requiredProps) => {
  return (props, propName, componentName) => {
    if (!Array.isArray(requiredProps)) {
      throw new Error([
        'Invalid `requiredProps` argument supplied to require, expected an instance of array.'
          ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''))
    }

    // skip if prop is undefined
    if (props[propName] === undefined) return

    const missingRequired = requiredProps.filter(requiredProp => props[requiredProp] === undefined)
    if (missingRequired.length > 0) {
      return new Error(
        `\`${propName}\` prop in \`${componentName}\` requires props: \`${missingRequired.join('`, `')}\`.`,
      )
    }
  }
}

/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param {string} help A help message to display with the deprecation warning.
 * @param {function} [validator] A propType function.
 */
export const deprecate = (help, validator) => {
  return (props, propName, componentName, ...args) => {
    if (typeof help !== 'string') {
      throw new Error([
        'Invalid `help` argument supplied to deprecate, expected a string.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '))
    }

    // skip if prop is undefined
    if (props[propName] === undefined) return

    // deprecation error and help
    const error = new Error(`The \`${propName}\` prop in \`${componentName}\` is deprecated.`)
    if (help) error.message += ` ${help}`

    // add optional validation error message
    if (validator) {
      if (typeof validator === 'function') {
        const validationError = validator(props, propName, componentName, ...args)
        if (validationError) {
          error.message = `${error.message} ${validationError.message}`
        }
      } else {
        throw new Error([
          'Invalid argument supplied to deprecate, expected a function.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '))
      }
    }

    return error
  }
}

// ----------------------------------------
// Prop specific types
// ----------------------------------------

/**
 * Ensure a prop conforms to shorthand prop standards.
 */
export const shorthand = (...args) => every([
  disallow(['children']),
  PropTypes.string,
])(...args)

/**
 * Ensure a prop conforms to icon prop standards.
 */
export const icon = (...args) => every([
  disallow(['children', 'image']),
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),
])(...args)

/**
 * Ensure a prop conforms to icon prop standards.
 */
export const image = (...args) => every([
  disallow(['children', 'icon']),
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),
])(...args)

/**
 * Ensure a prop conforms to children prop standards.
 */
export const children = (Component) => (props, ...rest) => {
  const disallowedProps = _.flow(
    _.pickBy(checker => checker === shorthand || checker === icon || checker === image),
    _.keys,
  )(Component.propTypes)

  return every([
    disallow(disallowedProps),
    PropTypes.node,
  ])(props, ...rest)
}

/**
 * Ensure a prop can be used as a React key in an array of child components.
 */
export const childKey = (...args) => every([
  PropTypes.string,
  PropTypes.number,
])(...args)
