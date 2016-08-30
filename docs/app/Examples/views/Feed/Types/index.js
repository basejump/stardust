import React from 'react'
import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'

const FeedTypesExamples = () => {
  return (
    <ExampleSection title='Types'>
      <ComponentExample
        title='Feed'
        description='A feed'
        examplePath='views/Feed/Types/Basic'
      />
      <ComponentExample
        description='You can also pass an array of events to generate the markup'
        examplePath='views/Feed/Types/EventsProp'
      />
    </ExampleSection>
  )
}

export default FeedTypesExamples
