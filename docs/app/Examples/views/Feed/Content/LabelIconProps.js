import React from 'react'
import { Feed } from 'stardust'

const LabelIconProps = () => (
  <Feed>
    <Feed.Event>
      <Feed.Label icon='pencil' />
      <Feed.Content summary="You posted on your friend Stevie Feliciano's wall." date='Today' />
    </Feed.Event>
  </Feed>
)

export default LabelIconProps
