import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextEditor from '../textEditor/TextEditor';
import './index.css';
import Select from 'react-select';
import FileUpload from '../fileUploadAdmin/FileUpload';
import { getRelatedArticlesAdmin, getTagsFromArticlesAdd, postArticle, postTestimonial, postVacancy } from '../../api';

export default function Add() {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [seoUrl, setSeoUrl] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [locationVacancy, setLocationVacancy] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [selectedRelatedArticles, setSelectedRelatedArticles] = useState([]);
    const [preview, setPreview] = useState('');
    const [readTime, setReadTime] = useState('');
    const [authorTestimonial, setAuthorTestimonial] = useState('')
    const [position, setPosition] = useState('')
    const [comment, setComment] = useState('')
    const [countOfStars, setCountOfStars] = useState('')
    const [image, setImage] = useState('')
    const [relation, setRelation] = useState('')

    useEffect(() => {
        handleGetTagsAndRelatedArticles();
    }, [location]);

    useEffect(() => {
        document.querySelector('.main__content__admin').scrollTo(0, 0);
    }, [location]);

    const handleGetTagsAndRelatedArticles = async () => {
        const fetchTags = await getTagsFromArticlesAdd()
        setTags(fetchTags)
        const fetchRelatedArticles = await getRelatedArticlesAdmin()
        setRelatedArticles(fetchRelatedArticles)
    }

    const handleChangeTags = (selected) => {
        setSelectedTags(selected);
    };

    const handleChangeArticles = (selected) => {
        setSelectedRelatedArticles(selected);
    };

    const handleCreate = async () => {
        if (location.pathname === '/vacancies/add') {
            try {
                if (title && status && seoTitle && seoDescription && body && locationVacancy && employmentType) {
                    const formData = new FormData()

                    formData.append('title', title)
                    formData.append('seoUrl', seoUrl || '')
                    formData.append('seoTitle', seoTitle)
                    formData.append('seoDescription', seoDescription)
                    formData.append('body', body)
                    formData.append('location', locationVacancy)
                    formData.append('employmentType', employmentType)
                    formData.append('status', status)

                    for (let pair of formData.entries()) {
                        console.log(`${pair[0]}: ${pair[1]}`);
                    }

                    await postVacancy(formData, navigate)
                    
                } else {
                    alert('Please enter all required data');
                }
            } catch (error) {
                console.error('Error creating vacancy:', error);
            }
        } else if (location.pathname === '/articles/add') {
            try {
                if (title && status && seoTitle && seoDescription && body && preview) {
                    const formData = new FormData();

                    formData.append('title', title);
                    formData.append('author', author || '');
                    formData.append('seoUrl', seoUrl || '');
                    formData.append('seoTitle', seoTitle);
                    formData.append('seoDescription', seoDescription);
                    formData.append('tags', JSON.stringify(selectedTags.map(tag => tag.value)) || '');
                    formData.append('relatedArticles', JSON.stringify(selectedRelatedArticles.map(article => article.value)) || '');
                    formData.append('body', body);
                    formData.append('status', status);
                    formData.append('readTime', readTime);
                    formData.append('preview', preview);

                    await postArticle(formData, navigate)
                } else {
                    alert('Please enter all required data');
                }
            } catch (error) {
                console.error('Error creating article:', error);
            }
        } else if (location.pathname === '/testimonials/add') {
            try {
                if (authorTestimonial && position && comment && countOfStars && image && relation) {
                    const formData = new FormData();

                    formData.append('author', authorTestimonial);
                    formData.append('position', position);
                    formData.append('comment', comment);
                    formData.append('countOfStars', countOfStars);
                    formData.append('image', image);
                    formData.append('relation', relation);

                    await postTestimonial(formData, navigate)
                }
            } catch (error) {
                console.error('Error creating testimonial:', error);
            }
        }
    };

    const renderForm = () => {
        if (location.pathname === '/vacancies/add') {
            return (
                <form onSubmit={handleCreate} className='margin__bottom'>
                    <div className='title__admin'>Vacancies</div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Title</div>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional__admin'>SEO Url</div>
                        <input
                            type='text'
                            value={seoUrl}
                            onChange={(e) => setSeoUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>SEO Title</div>
                        <input
                            type='text'
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>SEO Description</div>
                        <input
                            type='text'
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            required
                        />
                    </div>
                    <TextEditor
                        body={""}
                        setBody={setBody}
                    />
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Location</div>
                        <input
                            type='text'
                            value={locationVacancy}
                            onChange={(e) => setLocationVacancy(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Employment type</div>
                        <select
                            type='text'
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'Full-time'}>Full-time</option>
                            <option value={'Part-time'}>Part-time</option>
                            <option value={'Temporary'}>Temporary</option>
                            <option value={'Flexible'}>Flexible</option>
                        </select>
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Status</div>
                        <select
                            type='text'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'Active'}>Active</option>
                            <option value={'Draft'}>Draft</option>
                        </select>
                    </div>
                    <button className='save__btn' type='submit'>Save</button>
                </form>
            );
        } else if (location.pathname === '/articles/add') {
            return (
                <form onSubmit={handleCreate} className='margin__bottom'>
                    <div className='title__admin'>Articles</div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Title</div>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional__admin'>Author</div>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional__admin'>SEO Url</div>
                        <input
                            type='text'
                            value={seoUrl}
                            onChange={(e) => setSeoUrl(e.target.value)}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>SEO Title</div>
                        <input
                            type='text'
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>SEO Description</div>
                        <input
                            type='text'
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__optional__admin'>Tags</div>
                        <Select
                            isMulti
                            value={selectedTags}
                            onChange={handleChangeTags}
                            options={tags}
                            className='Select'
                        />
                    </div>
                    <TextEditor
                        body={""}
                        setBody={setBody}
                    />
                    <div className='edit__form'>
                        <div className='subtitle__optional__admin'>Related Articles</div>
                        <Select
                            isMulti
                            value={selectedRelatedArticles}
                            onChange={handleChangeArticles}
                            options={relatedArticles}
                            className='Select'
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Preview</div>
                        <FileUpload onFileSelect={setPreview} isEditPage={false} article={null} />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Status</div>
                        <select
                            type='text'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'active'}>Active</option>
                            <option value={'draft'}>Draft</option>
                        </select>
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Read time</div>
                        <input
                            type='number'
                            value={readTime}
                            onChange={(e) => setReadTime(e.target.value)}
                        />
                    </div>
                    <button className='save__btn' type='submit'>Save</button>
                </form>
            );
        } else if (location.pathname === '/testimonials/add') {
            return (
                <form onSubmit={handleCreate} className='margin__bottom'>
                    <div className='title__admin'>Testimonials</div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Author</div>
                        <input
                            type='text'
                            value={authorTestimonial}
                            onChange={(e) => setAuthorTestimonial(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Position</div>
                        <input
                            type='text'
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Comment</div>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Count of Stars</div>
                        <input
                            type='number'
                            value={countOfStars}
                            onChange={(e) => setCountOfStars(e.target.value)}
                            min='1'
                            max='5'
                        />
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Relation</div>
                        <select
                            type='text'
                            value={relation}
                            onChange={(e) => setRelation(e.target.value)}
                            required
                        >
                            <option value={''}></option>
                            <option value={'homePage'}>Home page</option>
                            <option value={'aboutPage'}>About us page</option>
                            <option value={'productPage'}>Product page</option>
                            <option value={'loyaltyPage'}>Loyalty page</option>
                        </select>
                    </div>
                    <div className='edit__form'>
                        <div className='subtitle__admin'>Author image</div>
                        <FileUpload onFileSelect={setImage} isEditPage={false} article={null} />
                    </div>
                    <button className='save__btn' type='submit'>Save</button>
                </form>
            );
        } else {
            return <p>No add available for this page</p>;
        }
    };

    return (
        <div className='all__content__admin'>
            {renderForm()}
        </div>
    );
}
