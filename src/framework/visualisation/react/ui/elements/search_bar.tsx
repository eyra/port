import { Weak } from '../../../../helpers'
import { PropsUISearchBar } from '../../../../types/elements'

export const SearchBar = ({
  search,
  onSearch,
  placeholder
}: Weak<PropsUISearchBar>): JSX.Element => {
  function handleKeyPress (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <form>
      <div className='flex flex-row '>
        <input
          className={`text-grey1  font-body pl-3 pr-3 w-full border-2 border-solid border-grey3 
          focus:outline-none focus:border-primary rounded-lg h-44px`}
          placeholder={placeholder ?? ''}
          // name="query"  // autcomplete popup is annoying
          type='search'
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </form>
  )
}
