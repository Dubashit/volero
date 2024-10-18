import axios from "axios";
import { API_URL, PUBLIC_URL } from "./config";

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
        const response = await axios.get(`${API_URL}/articles/search?status=active`);
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
    return (<img src={`${PUBLIC_URL}${item.preview}`} alt={item.title} />)
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
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const getTestimonialAuthorImage = (item) => {
    return (<img src={`${PUBLIC_URL}${item.image}`} alt={item.title} />)
}

export const postRequestRegister = async (formData, navigate) => {
    try {
        const response = await axios.post(`${API_URL}/requestRegister`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert('Data sent');
            navigate('/')
        } else {
            alert('Error sending data');
        }
    } catch (error) {
        console.error(error);
    }
};

export const postLogin = async (data) => {
    try {
        const response = await axios.post('https://www.volero.net/reseller/auth', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            console.log('Login successful');
            window.location.href = 'https://www.volero.net/reseller/home';
        } else {
            alert('Please enter all fields')
        }
    } catch (error) {
        console.error('Error:', error);
    }
}