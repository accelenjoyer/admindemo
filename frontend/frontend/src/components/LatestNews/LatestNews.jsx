import React, {useState} from 'react';
import "./LatestNews.scss"
import Image from "next/image";
import formatDate from "@/lib/formatDate";
const LatestNews = ({ articles }) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    const sortedArticles = articles
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const visibleArticles = sortedArticles.slice(0, visibleCount);

    const truncateContent = (content, maxLength = 100) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div style={{display: "flex",flexDirection : "column",alignItems: "center"}}>
            <h2 style={{color: "black"}}>Последние новости</h2>
            <div className="latest-container">
                {visibleArticles.map((article, i) => (
                    <div key={article._id || i} className="latest-box">
                        <div className="image-box">
                            <Image
                                src={article.images}
                                alt=""
                                width={270}
                                height={170}
                                className="news-image"
                            />
                        </div>
                        <div className="latest-content">
                            <div className="latest-overlay">
                                <a href="#">{article.title}</a>
                            </div>
                            <div className="latest-text">
                                <p>{truncateContent(article.content)}</p> {/* Используем truncateContent */}
                                <span className="info">{formatDate(article.date)}</span>
                            </div>
                        </div>

                    </div>

                ))}

            </div>
            <button className="show-more-button" onClick={handleShowMore}>Ещё</button>
        </div>
    );
};
export default LatestNews;