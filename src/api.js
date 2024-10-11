import axios from "axios";
import { API_URL } from "./config";

export const getTags = async () => {
    try {
        const response = await axios.get(`${API_URL}/tags`);
        return response.data
    } catch (error) {
        console.error(error);
    }
};

export const getBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/articles`);
        return response.data
    } catch (error) {
        console.error(error);
    }
};

let cachedArticles = {};

export const getRelatedArticles = async (item) => {
    if (item?.relatedArticles && item?.relatedArticles.length > 0) {
        try {
            let responses = [];

            for (let article of item.relatedArticles) {
                if (cachedArticles[article]) {
                    responses.push(cachedArticles[article]);
                } else {
                    const response = await axios.get(`${API_URL}/articles/search?title=${article}&status=active`);
                    const articleData = response.data[0];
                    cachedArticles[article] = articleData;
                    responses.push(articleData);
                }
            }

            return responses;
        } catch (error) {
            console.error('Error fetching related blogs:', error);
        }
    }
};

export const getArticlesPreview = (item) => {
    return (<img src={`http://localhost:3001/public${item.preview}`} alt={item.title} />)
}

export const getVacancies = async () => {
    try {
        const responce = await axios.get(`${API_URL}/vacancies`)
        return responce.data
    } catch (error) {
        console.error("Error!!!!!!!!!" + error)
    }
}

export const postResume = async (formData, navigate) => {
    try {
        await axios.post(`${API_URL}/resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('Form submitted successfully!');
        navigate('/')
    } catch (error) {
        alert('There was an error submitting the form.');
    }
}

export const getTestimonials = async () => {
    try {
        const response = await axios.get(`${API_URL}/testimonials`)
        console.log(response.data);
        
        return response.data
        
    } catch (error) {
        console.error(error);
    }
}

export const getTestimonialAuthorImage = (item) => {
    return (<img src={`http://localhost:3001/public${item.image}`} alt={item.title} />)
}