import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ScrollToTopButton from '../../components/scrollToTopButton/ScrollToTopButton';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import { format } from 'date-fns';
import { getArticlesPreview, getBlogs, getTags } from '../../api';
import { Pagination } from 'antd'; // Импорт Pagination из antd

export default function BlogPage() {

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

    const [tags, setTags] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(6);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Volerò - Blog';
        handleFetchTags();
        handleFetchArticles();
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setBlogsPerPage(6);
            } else if (window.innerWidth >= 500) {
                setBlogsPerPage(4);
            } else {
                setBlogsPerPage(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFetchTags = async () => {
        const fetchedTags = await getTags();
        console.log(fetchedTags);
        setTags(fetchedTags);
    };

    const handleFetchArticles = async () => {
        const fetchArticles = await getBlogs();
        console.log(fetchArticles);
        setBlogs(fetchArticles);
        setFilteredBlogs(fetchArticles);
    };

    const handleTagClick = (tagId) => {
        if (activeTags.includes(tagId)) {
            const newActiveTags = activeTags.filter((id) => id !== tagId);
            setActiveTags(newActiveTags);
            filterBlogs(newActiveTags);
        } else {
            const newActiveTags = [...activeTags, tagId];
            setActiveTags(newActiveTags);
            filterBlogs(newActiveTags);
        }
    };

    const filterBlogs = (activeTags) => {
        if (activeTags.length === 0) {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter((blog) => {
                return blog.tags.some((tag) => activeTags.includes(tags.find((t) => t.title === tag)?.id));
            });
            setFilteredBlogs(filtered);
        }
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Header />
            <div className='main'>
                <div className='gray__background'>
                    <div className='container'>
                        <div className='blog__content'>
                            <div className='title__block'>
                                <div className='title__line'></div>
                                <div className='title__text'>Our Blog</div>
                            </div>
                            <div className='blog__general__title'>
                                <div className='title'>Useful insights and the latest news</div>
                                <p>Discover tips, guides, and other helpful content for travel companies. Use the filter below to find blog posts on a topic that interests you.</p>
                            </div>
                            <div className='blog__tags__block'>
                                {Array.isArray(tags) ? tags?.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className={`blog__tag ${activeTags.includes(tag.id) ? 'active' : ''}`}
                                        onClick={() => handleTagClick(tag.id)}
                                    >
                                        {tag.title}
                                        {activeTags.includes(tag.id) && <span className="cross">✖</span>}
                                    </div>
                                )) : null}
                            </div>
                            {activeTags?.length > 0 && (
                                <div className='blog__count__block'>
                                    <div>{`Found ${filteredBlogs.length} blog(s) for selected tag(s)`}</div>
                                </div>
                            )}
                            <div className='blog__row'>
                                {Array.isArray(currentBlogs) ? currentBlogs?.map((blog) => (
                                    <div
                                        onClick={() => navigate(`/blog/${blog.id}`, { state: { blog } })}
                                        className='block__item'
                                        key={blog.id}
                                    >
                                        {getArticlesPreview(blog)}
                                        <div className='blog__head'>
                                            <div className='blog__date'>{format(new Date(blog?.createdAt), 'dd/MM/yyyy')}</div>
                                        </div>
                                        <div className='blog__title'>
                                            <div>{blog.title}</div>
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                            <Pagination
                                current={currentPage}
                                pageSize={blogsPerPage}
                                total={filteredBlogs.length}
                                onChange={onPageChange}
                                showQuickJumper
                                align='center'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
