import searchBarStyles from '../styles/SearchBar.module.css'

export function SearchBar({ setSearchValue, includeDrafted, setIncludeDrafted }) {
    return (
        <div id='search_bar'>
            <input placeholder='Enter Partial Name'
                onChange={event => setSearchValue(event.target.value)} />
            <label className={searchBarStyles.drafted_label}>
                include drafted
                <input className={searchBarStyles.drafted_label} checked={includeDrafted}
                    type='checkbox'
                    onChange={() => { setIncludeDrafted(!includeDrafted) }} />
            </label>
        </div>
    )
}