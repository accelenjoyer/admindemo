"use client"
import React from 'react';
import "./SecondCategorySection.scss"
import Image from "next/image"


const SecondCategorySection = ({articles}) => {

    const truncateContent = (content, maxLength = 100) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className="second-container">
            <h2 style={{color: "black"}}>Категория</h2>
            <div className="grid-container">
                {articles.slice(0,8).map((article) => (
                    <div key={article.id} className="grid-item">
                        <div className="item-header">
                            <div className="categories">
                                {article.categories.map(cat => (
                                    <span key={cat._id} className="category-item">{cat.name},</span>
                                ))}
                            </div>
                            <Image
                                src={article.images}
                                alt={article.title}
                                width={90}
                                height={90}
                                style={{objectFit: 'cover'}}
                            />
                        </div>
                        <div className="text-containerer">
                            <h3>{article.title}</h3>
                            <p>{truncateContent(article.content)}</p>
                            <div className="article-date">{article.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecondCategorySection;



