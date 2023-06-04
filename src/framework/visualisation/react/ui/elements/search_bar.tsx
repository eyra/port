import { useMemo } from 'react'
import { Weak } from '../../../../helpers'
import { PropsUISearchBar } from '../../../../types/elements'
import _ from 'lodash'

export const SearchBar = ({ placeholder, debounce = 1000, onSearch }: Weak<PropsUISearchBar>): JSX.Element => {
  function handleKeyPress (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const words = event.target.value.split(/\s+/)
    onSearch(words)
  }

  const handleChangeDebounced = useMemo(() => _.debounce(handleChange, 300), [])

  return (
    <form>
      <div className='flex flex-row'>
        <input
          className='text-grey1 text-bodymedium font-body pl-3 pr-3 w-full border-2 border-solid border-grey3 focus:outline-none focus:border-primary rounded h-48px'
          placeholder={placeholder}
          name='query'
          type='search'
          onChange={handleChangeDebounced}
          onKeyPress={handleKeyPress}
        />
      </div>
    </form>
  )
}
