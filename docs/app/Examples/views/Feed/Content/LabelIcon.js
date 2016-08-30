import React from 'react'
import { Feed, Icon } from 'stardust'

const LabelIcon = () => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <Icon name='pencil' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          You posted on your friend <a>Stevie Feliciano's</a> wall.
          <Feed.Date>Today</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default LabelIcon
