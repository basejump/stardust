import React from 'react'
import { Breadcrumb } from 'stardust'

const BreadcrumbSectionExample = () => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider />
    <Breadcrumb.Section active>Search</Breadcrumb.Section>
  </Breadcrumb>
)

export default BreadcrumbSectionExample
