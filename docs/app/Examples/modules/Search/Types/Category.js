import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'stardust'

const getResults = () => _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

const source = _.range(0, 3).reduce((memo, index) => {
  const name = faker.hacker.noun()

  memo[name] = {
    name,
    results: getResults(),
  }

  return memo
}, {})

export default class SearchCategoryExample extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleChange = (e, result) => this.setState({ value: result.title })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      const filteredResults = _.reduce(source, (memo, data, name) => {
        const results = _.filter(data.results, isMatch)

        if (results.length) {
          memo[name] = { name, results }
        }

        return memo
      }, {})

      this.setState({
        isLoading: false,
        results: filteredResults,
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            category
            loading={isLoading}
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column>
      </Grid>
    )
  }
}
