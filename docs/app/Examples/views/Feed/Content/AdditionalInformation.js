import _ from 'lodash'
import React from 'react'
import { Feed } from 'stardust'

const images = _.times(2, () => 'http://semantic-ui.com/images/wireframe/image.png')

const AdditionalInformation = () => {
  return (
    <Feed>
      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/helen.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Helen Troy</a> added 2 photos
          </Feed.Summary>
          <Feed.Extra images>
            <a><img src='http://semantic-ui.com/images/wireframe/image.png' /></a>
            <a><img src='http://semantic-ui.com/images/wireframe/image.png' /></a>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/helen.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Helen Troy</a> added 2 photos
          </Feed.Summary>
          <Feed.Extra images={images} />
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/helen.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Helen Troy</a> added 2 photos
          </Feed.Summary>
          <Feed.Extra images={images} />
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/helen.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Helen Troy</a> added 2 photos
          </Feed.Summary>
          <Feed.Extra images>
            <a><img src='http://semantic-ui.com/images/wireframe/image.png' /></a>
            <a><img src='http://semantic-ui.com/images/wireframe/image.png' /></a>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/laura.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Laura Faucet</a> created a post
          </Feed.Summary>
          <Feed.Extra text>
            Have you seen what's going on in Israel? Can you believe it.
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Label image='http://semantic-ui.com/images/avatar/small/laura.jpg' />
        <Feed.Content>
          <Feed.Date>3 days ago</Feed.Date>
          <Feed.Summary>
            <a>Laura Faucet</a> created a post
          </Feed.Summary>
          <Feed.Extra text="Have you seen what's going on in Israel? Can you believe it." />
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default AdditionalInformation
