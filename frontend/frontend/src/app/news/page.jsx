"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/components/Header/Header";
import MostReadableNews from "@/components/MostReadableNews/MostReadableNews";
import LatestNews from "@/components/LatestNews/LatestNews";
import Footer from "@/components/Footer/Footer";
import SecondCategorySection from "@/components/SecondCategorySection/SecondCategorySection";
const Main = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const items = Array.from({ length: 4 });
    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:5000/api/adminmenu");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data);
                setError(null);
            } catch (e) {
                console.error("Failed to fetch articles:", e);
                setError("Failed to load articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    useEffect(() => {
        if (searchValue.trim() === '') {
            // Если поиск пустой — показываем все статьи
            setFilteredArticles(articles);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/news/search?query=${encodeURIComponent(searchValue)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFilteredArticles(data);
            } catch (error) {
                console.error('Ошибка при поиске:', error);
                setFilteredArticles([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, articles]);

    return (
        <div>
            <Header
                articles={filteredArticles}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
            />
            <MostReadableNews articles = {articles}/>
            <LatestNews articles = {articles} />
            <SecondCategorySection articles = {articles}/>
            <Footer/>
        </div>
    );
};

export default Main;