import React from 'react'
import { Image, List } from 'stardust'

const ListExampleSizes = () => {
  const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

  return (
    <div>
      {sizes.map(size => (
        <div key={size}>
          <List divided horizontal size={size}>
            <List.Item>
              <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg' />
              <List.Content>
                <List.Header>Helen</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='http://semantic-ui.com/images/avatar/small/christian.jpg' />
              <List.Content>
                <List.Header>Christian</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <Image avatar src='http://semantic-ui.com/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel</List.Header>
              </List.Content>
            </List.Item>
          </List>

          <br />
        </div>
      ))}
    </div>
  )
}

export default ListExampleSizes
