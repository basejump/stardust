import React from 'react'
import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'

const FeedContentExamples = () => {
  return (
    <ExampleSection title='Content'>
      <ComponentExample
        title='Image Label'
        description='An event can contain an image label'
        examplePath='views/Feed/Content/LabelImage'
      />
      <ComponentExample
        description='You can also configure an image label via props'
        examplePath='views/Feed/Content/LabelImageProps'
      />
      <ComponentExample
        title='Icon Label'
        description='An event can contain an icon label'
        examplePath='views/Feed/Content/LabelIcon'
      />
      <ComponentExample
        description='You can also configure an icon label via props'
        examplePath='views/Feed/Content/LabelIconProps'
      />

      <ComponentExample
        title='Content Date'
        description='Event content can contain a date'
        examplePath='views/Feed/Content/DateContent'
      />
      <ComponentExample
        description='You can also configure a content date via props'
        examplePath='views/Feed/Content/DateContentProps'
      />
      <ComponentExample
        title='Summary Date'
        description='An event summary can contain a date'
        examplePath='views/Feed/Content/DateSummary'
      />
      <ComponentExample
        description='You can also configure a summary date via props'
        examplePath='views/Feed/Content/DateSummaryProps'
      />

      <ComponentExample
        title='Additional information'
        description='An event can contain additional information like a set of images or text'
        examplePath='views/Feed/Content/AdditionalInformation'
      />
    </ExampleSection>
  )
}

export default FeedContentExamples
