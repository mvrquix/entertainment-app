import { useState, useEffect } from 'react'
import {
    VIEW_HOME,
    VIEW_MOVIES,
    VIEW_TV,
    VIEW_BOOKMARKS
} from '../views'
import MediaItemCard from './MediaItemCard'
import SideNavBar from './SideNavBar'
import TopNavBar from './TopNavBar'


const EntertainmentUI = (props) => {
    const { data } = props
    const movies = data.filter(d => d.category === 'Movie')
    const tv = data.filter(d => d.category === 'TV Series')
    const bookmarked = data.filter(d => d.isBookmarked)

    const [currentView, setCurrentView] = useState(VIEW_HOME)
    const [searchState, setSearchState] = useState({
        input: '',
        results: []
    })
    const [bookmarks, setBookmarks] = useState([...bookmarked])

    // SEARCH EFFECTS
    const { input } = searchState
    useEffect(() => {
        let results = []
        if (input !== '') {
            if (input.length >= 3) {
                switch (currentView) {
                    case VIEW_HOME:
                        results = handleSearchByName(input, data)
                        break
                    case VIEW_MOVIES:
                        results = handleSearchByName(input, movies)
                        break
                    case VIEW_TV:
                        results = handleSearchByName(input, tv)
                        break
                    case VIEW_BOOKMARKS:
                        results = handleSearchByName(input, bookmarked)
                        break
                    default:
                        results = []
                }

                setSearchState({
                    ...searchState,
                    results: results
                })
            }
        }
    }, [input])

    useEffect(() => {
        setSearchState({
            input: '',
            results: []
        })
    }, [currentView])

    const handleSearchByName = (input, data) => {
        return data.filter(d => {
            const title = d.title.toLowerCase()
            return title.includes(input.toLowerCase())
        })
    }

    const handleSearchInputChange = (event) => {
        const { value } = event.target
        setSearchState({
            ...searchState,
            input: value
        })
    }

    const handleBookmark = (item) => {
        const isBookmarked = bookmarks.includes(item)
        item.isBookmarked = !isBookmarked
        if (!isBookmarked)
            setBookmarks([...bookmarks, item])
        else
            setBookmarks(bookmarks.filter(x => x.title === item.title))
    }

    const renderHome = () => {
        return (
            <div className="row">
                <h3 className="text-white mb-3">Recommended for you</h3>
                {
                    data.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
            </div>
        )
    }

    const renderMovies = () => {
        return (
            <div className="row">
                <h3 className="text-white mb-3">Movies</h3>
                {
                    movies.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
            </div>
        )
    }

    const renderTV = () => {
        return (
            <div className="row">
                <h3 className="text-white mb-3">TV Series</h3>
                {
                    tv.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
            </div>
        )
    }

    const renderBookmarks = () => {
        const bookmarkedMovies = bookmarked.filter(x => x.category == 'Movie')
        const bookmarkedTV = bookmarked.filter(x => x.category == 'TV Series')
        return (
            <div className="row">
                <h3 className="text-white mb-3">Bookmarked Movies</h3>
                {
                    bookmarkedMovies.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
                <h3 className="text-white mb-3">Bookmarked TV Series</h3>
                {
                    bookmarkedTV.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
            </div>
        )
    }

    const renderSearchResults = () => {
        const { results } = searchState
        return (
            <div className="row">
                <h3 className="text-white mb-3">Found {results.length} results for '{input}'</h3>
                {
                    results.map(item => {
                        return <MediaItemCard item={item} handleBookmark={handleBookmark} />
                    })
                }
            </div>
        )
    }

    const renderSearchInputPlaceholder = (current) => {
        switch (current) {
            case VIEW_HOME:
                return 'Search for movies or TV series'
            case VIEW_MOVIES:
                return 'Search for movies'
            case VIEW_TV:
                return 'Search for TV series'
            case VIEW_BOOKMARKS:
                return 'Search for bookmarked shows'
        }
    }

    const handleViewChange = (view) => {
        setCurrentView(view)
    }

    return (
        <div className="container-fluid p-3" style={{ background: '#10141E', minHeight: '100vh' }}>
            <div className="row h-100">
                <SideNavBar currentView={currentView} handleViewChange={handleViewChange} />
                <TopNavBar currentView={currentView} handleViewChange={handleViewChange} />
                <div className="col-lg-11 col-md-12 pt-4">
                    <div className="input-group mb-3">
                        <span className="input-group-text"><img src="/assets/icon-search.svg" /></span>
                        <input
                            value={input}
                            onChange={handleSearchInputChange}
                            type="text"
                            className="form-control"
                            placeholder={renderSearchInputPlaceholder(currentView)}
                            style={{ color: '#fff' }} />
                    </div>
                    {
                        (searchState.input !== '' && searchState.results.length > 0)
                            ?
                            renderSearchResults()
                            :
                            <>
                                {currentView === VIEW_HOME && renderHome()}
                                {currentView === VIEW_MOVIES && renderMovies()}
                                {currentView === VIEW_TV && renderTV()}
                                {currentView === VIEW_BOOKMARKS && renderBookmarks()}
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default EntertainmentUI