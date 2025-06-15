"use client"
import React, {useEffect, useState} from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import "./adminmenu.scss"
import ArticleForm from "@/components/ArticleForm/ArticleForm";
import ArticlesList from "@/components/ArticlesList/ArticlesList";
import Header from "@/components/Header/Header";
const AdminMenu = () => {
    const categories = [
        { name: 'Город', slug: 'city' },
        { name: 'Транспорт', slug: 'transport' },
        { name: 'Люди', slug: 'people' },
        { name: 'Политика', slug: 'politics' },
        { name: 'Здоровье', slug: 'health' },
        { name: 'Происшествия', slug: 'accidents' },
        { name: 'Полезное', slug: 'useful' },
    ];
    const [articles, setArticles] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isFormShown,setIsFormShown] = useState(false)
    const ChangeForm = () => {
        setIsFormShown(!isFormShown)

    }

    useEffect(() => {
        const fetchArticles = async () => {

            try {
                let url = 'http://localhost:5000/api/adminmenu';
                if (selectedCategory) {
                    url = `http://localhost:5000/api/articles/category/${selectedCategory}`
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data);

            } catch (error) {
                console.error('Ошибка при получении новостей:', error);


            }
        };

        fetchArticles();
    }, [selectedCategory]);

    const handleCategorySelect = (categorySlug) => {
        setSelectedCategory(categorySlug);
    };
    return (
        <div className="adminmenu-container">
            <Header/>
            {isFormShown ? <ArticleForm cat = {categories} articles = {articles}/> :  <ArticlesList articles={articles} setArticles = {setArticles}/>}
            <Sidebar categories={categories} onCategorySelect = {handleCategorySelect} swapForm = {ChangeForm}/>

        </div>
    );
};

export default AdminMenu;