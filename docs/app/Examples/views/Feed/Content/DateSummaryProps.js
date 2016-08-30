import React from 'react'
import { Feed } from 'stardust'

const DateSummary = () => (
  <Feed>
    <Feed.Event
      image='http://semantic-ui.com/images/avatar/small/jenny.jpg'
      summary='You added Jenny Hess to your coworker group.'
      date='3 days ago'
    />

    <Feed.Event>
      <Feed.Label image='http://semantic-ui.com/images/avatar/small/jenny.jpg' />
      <Feed.Content
        summary='You added Jenny Hess to your coworker group.'
        date='3 days ago'
      />
    </Feed.Event>
  </Feed>
)

export default DateSummary
