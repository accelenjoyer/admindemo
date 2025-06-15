"use client"
import React, {useState} from 'react';
import Link from "next/link";
import "./Sidebar.scss"

const Sidebar = ({categories,onCategorySelect,swapForm}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (category) => {
        const newSelectedCategory = selectedCategory === category.name ? null : category.name;

        setSelectedCategory(newSelectedCategory);
        onCategorySelect(newSelectedCategory);
    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? '❮' : '❯'}
            </button>
            <nav>
                <ul>
                    {categories.map((category) => (
                        <li key={category.name}>
                            <button
                                className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={swapForm} className="swap-button">
                    Создать статью
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;