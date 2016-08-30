import React from 'react'
import { Feed } from 'stardust'

const LabelImageProps = () => (
  <Feed>
    <Feed.Event>
      <Feed.Label image='http://semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Feed.Content content='You added Elliot Fu to the group Coworkers' />
    </Feed.Event>
  </Feed>
)

export default LabelImageProps
