import { useState } from 'react'
import BookmarkIcon from "./BookmarkIcon"

const MediaItemCard = ({ item, handleBookmark }) => {
    const [hover, onHover] = useState(false)

    const renderItemCategory = (category) => {
        switch (category) {
            case 'Movie':
                return (
                    <>
                        <span className="mb-2">
                            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'unset' }}>
                                <path d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z" fill="#FFF" opacity=".75" />
                            </svg>
                        </span>

                        <span className="ms-1">{category}</span>
                    </>
                )
            case 'TV Series':
                return (
                    <>
                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'unset' }}>
                            <path d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z" fill="#FFF" opacity=".75" />
                        </svg>
                        <span className="ms-1">{category}</span>
                    </>
                )
            default:
                return ''
        }
    }

    return (
        <div
            key={item.title}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="item-card col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card">
                <BookmarkIcon item={item} handleBookmark={handleBookmark} />
                <div className="position-relative">
                    <img src={item.thumbnail.regular.large} className="card-img-top" />
                    <div className={`play-overlay ${hover ? '' : 'd-none'}`}>
                        <button className="play-btn btn position-absolute top-50 start-50 translate-middle rounded-pill">
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF" />
                            </svg>
                            <span className="ms-2 align-middle">Play</span>
                        </button>
                    </div>
                </div>
                <div className="card-body ps-0 pt-1">
                    <p className="card-text my-0 text-muted">
                        {item.year}
                        <span className="mx-2">&#183;</span>
                        {renderItemCategory(item.category)}
                        <span className="mx-2">&#183;</span>
                        {item.rating}
                    </p>
                    <p className="card-text">{item.title}</p>
                </div>
            </div>
        </div>
    )
}

export default MediaItemCard