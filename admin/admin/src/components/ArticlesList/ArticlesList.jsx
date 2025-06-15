"use client"
import React, {useEffect, useState} from 'react';
import "./ArticlesList.scss"
import Image from "next/image";
const ArticlesList = ({articles,setArticles}) => {
    const handleDeleteArticle = async (articleId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/adminmenu/${articleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));
            console.log('Статья успешно удалена');
        } catch (error) {
            console.error('Ошибка при удалении статьи:', error);
        }
    };


    return (
        <div className="news-list">
            <h2>Список новостей</h2>
            {articles.length > 0 ? (
                <ul className="news-list__list">

                    {articles.map(article => (

                        <li key={article._id} className="news-list__item">
                            <div className="btn-container">
                            <button className="dlt-btn" onClick={()=>handleDeleteArticle(article._id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6H21M19 6L18.298 19.189C18.193 20.198 17.437 21 16.42 21H7.58C6.563 21 5.807 20.198 5.702 19.189L5 6H19ZM10 11V16V11ZM14 11V16V11ZM15 6V4C15 3.46957 14.7893 2.96086 14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H11C10.4696 2 9.96086 2.21071 9.58579 2.58579C9.21071 2.96086 9 3.46957 9 4V6H15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <button className="edit-btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.232 5.232L18.768 8.768M2 22L8.158 21.013C8.351 20.988 8.529 20.899 8.665 20.759L21.405 8.019C22.198 7.226 22.198 5.922 21.405 5.129L18.871 2.595C18.078 1.802 16.774 1.802 15.981 2.595L3.241 15.335C3.101 15.471 3.012 15.649 2.987 15.842L2 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            </div>
                            <h3 className="news-list__title">{article.title}</h3>
                            <p className="news-list__author">Автор: {article.author}</p>
                            <p className="news-list__content">{article.content.substring(0, 100)}...</p>
                            <img src={article.images} alt=""/>
                            <ul className="news-list__categories">

                                {article.categories.map(category => (
                                    <div key={category.slug} className="news-list__category">{category.name}</div>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет новостей для отображения.</p>
            )}
        </div>
    );
};

export default ArticlesList;