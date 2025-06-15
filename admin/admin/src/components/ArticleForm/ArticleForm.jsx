"use client"
import React, {useState} from 'react';
import "./ArticleForm.scss"
const ArticleForm = ({cat,articles}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        images: '',
        author: '',
        categories: [],
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };
    const handleClick = (category) => {
        setFormData(prevState => {
            const currentCategories = prevState.categories || [];
            let newCategories;

            if (currentCategories.some(cat => cat.slug === category.slug)) {
                newCategories = currentCategories.filter(cat => cat.slug !== category.slug);
            } else {
                newCategories = [...currentCategories, category];
            }

            return {
                ...prevState,
                categories: newCategories,
            };
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();





        try {
            const response = await fetch('http://localhost:5000/api/adminmenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Новость успешно зарегистрирована!');
                setError('');
                setFormData({
                    title: '',
                    content: '',
                    images: '',
                    author: '',
                    categories: [],
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Неизвестная ошибка');
                setMessage('');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setError('Ошибка при отправке запроса на сервер');
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">

            {message && <p className={`article-form__message ${error ? 'article-form__message--error' : 'article-form__message--success'}`}>{message}</p>}
            {error && <p className="article-form__message article-form__message--error">{error}</p>}

            <div className="article-form__group">
                <label htmlFor="title" className="article-form__label">Заголовок:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="article-form__input" />
            </div>

            <div className="article-form__group">
                <label htmlFor="content" className="article-form__label">Содержание:</label>
                <textarea id="content" name="content" value={formData.content} onChange={handleChange} required className="article-form__textarea"></textarea>
            </div>

            <div className="article-form__group">
                <label htmlFor="images" className="article-form__label">Изображения (URL через запятую):</label>
                <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} className="article-form__input" />
            </div>

            <div className="article-form__group">
                <label htmlFor="author" className="article-form__label">Автор:</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required className="article-form__input" />
            </div>

            <div className="article-form__group">

                {cat.map(category => (
                    <button
                        key={category.slug}
                        onClick={() => handleClick(category)}
                        type="button"
                        className={`article-form__category-button ${
                            formData.categories.some(cat => cat.slug === category.slug) ? 'article-form__category-button--active' : ''
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <button type="submit" className="article-form__button">Отправить</button>
        </form>
    );
}


export default ArticleForm;