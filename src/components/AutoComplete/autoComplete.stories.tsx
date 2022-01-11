import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, {DataSourceType} from './AutoComplete'

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const SimpleComplete = () => {

  const handleFetch = async (query: string) => {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`)
    const { items } = await res.json()
    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h2>Name: {itemWithGithub.value}</h2>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      prepend={"Github昵称："}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
