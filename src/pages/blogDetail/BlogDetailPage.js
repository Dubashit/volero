import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import './index.css';
import Inner from '../../components/inner/Inner';
import { format } from 'date-fns';
import { getRelatedArticles, getArticlesPreview } from '../../api';

export default function BlogDetailPage() {

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = `${process.env.REACT_APP_API_URL}`;

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const blog = location.state?.blog;

    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Volerò - Blog';
    }, [location]);

    useEffect(() => {
        handleFetchRelatedArticles();
    }, [blog]);

    const handleFetchRelatedArticles = async () => {
        const fetchRelatedArticles = await getRelatedArticles(blog);
        setRelatedArticles(fetchRelatedArticles);
    };

    if (!blog) {
        return (
            <div>
                <Header />
                <div className="main">
                    <div className='gray__background'>
                        <div className='container'>
                            <div className='blog__error__content'>
                                <h2>Blog not found</h2>
                                <Link to="/blog">Back to Blog List</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='blog__detail__content'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Our blog</div>
                            </div>
                            <div className='title'>{blog?.title}</div>
                            <div className='blog__details__date'>{format(new Date(blog?.createdAt), 'dd/MM/yyyy')} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {blog?.readTime} min read</div>
                            {blog.tags.length > 0 && (
                                <div className='blog__tags__block'>
                                    {blog?.tags.map((tag, index) => (
                                        <div key={index} className='blog__tag'>{tag}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='white__background'>
                    <div className='container'>
                        <div className='blog__info'>
                            <Inner serverContent={blog.body} />
                            <Link to="/blog">Back to Blog List</Link>
                        </div>
                    </div>
                </div>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='related__posts__block'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Other proposals</div>
                            </div>
                            <div className='title'>Related posts</div>
                            <div className='related__posts__row'>
                                {Array.isArray(relatedArticles) && relatedArticles.slice(0, 3).map((relatedArticle, index) => (
                                    relatedArticle && (
                                        <div
                                            key={index}
                                            onClick={() => navigate(`/blog/${relatedArticle?.id}`, { state: { blog: relatedArticle } })}
                                            className='block__item'
                                        >
                                            {getArticlesPreview(relatedArticle)}
                                            <div className='blog__head'>
                                                <div className='blog__date'>{format(new Date(relatedArticle.createdAt), 'dd/MM/yyyy')}</div>
                                            </div>
                                            <div className='blog__title'>
                                                <div>{relatedArticle.title}</div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
