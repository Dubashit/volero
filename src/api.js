import axios from "axios";
import { API_URL, PUBLIC_URL } from "./config";

export const exampleQuerry = async () => {
    try {
        const response = await axios.get("https://www.volero.net/reseller/api/reservationsApi/v1/reservations")
        console.log(response);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

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
        console.log(API_URL);

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
    return (<img src={`${PUBLIC_URL}${item.preview}`} alt={item.title} loading="lazy" />)
}

export const getTestimonialAuthorImage = (item) => {
    return (<img src={`${PUBLIC_URL}${item.image}`} alt='testimonialALt' />)
}

export const getVacancies = async () => {
    try {
        const responce = await axios.get(`${API_URL}/vacancies/search?status=active`)
        return responce.data
    } catch (error) {
        console.error("Error!!!!!!!!!" + error)
    }
}

export const getTestimonials = async (relation) => {
    try {
        const response = await axios.get(`${API_URL}/testimonials/search?relation=${relation}`)
        // const response = await axios.get(`${API_URL}/testimonials`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const getUserFromLoyalty = async (salesId, username) => {
    try {
        const response = await axios.get(`${API_URL}/agents/pointsData/`, {
            params: {
                salesId: salesId,
                username: username
            }
        })        
        return response
    } catch (error) {
        console.error(error);
    }
}














export const postAuth = async (salesId, username) => {
    try {
        const responce = await axios.post(`${API_URL}/auth/token`, {
            username: salesId,
            password: username
        })
        localStorage.setItem('authToken', JSON.stringify(responce.data.access_token))
        localStorage.setItem('username', username)
        return responce
    } catch (error) {
        console.error(error)
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

export const postRequestForPoints = async (formData, onClose) => {
    try {
        const response = await axios.post(`${API_URL}/requestForPoints`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            alert('Data sent');
            onClose();
        } else {
            alert('Error sending data');
        }
    } catch (error) {
        alert('An error occurred while sending data');
    }
};

export const postLoginMain = async (data) => {
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























export const getTagsFromArticlesAdd = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        return tagsResponse.data.map(tag => ({ value: tag.title, label: tag.title }));
    } catch (error) {
        console.error("Error while fetching tags: ", error);
    }
};
export const getRelatedArticlesAdmin = async () => {
    try {
        const articles = await axios.get(`${API_URL}/articles`);
        return articles.data.map(article => ({ value: article.title, label: article.title }));
    } catch (error) {
        console.error("Error : " + error);
    }
};

export const getTagsFromArticlesEdit = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        const filteredTags = tagsResponse?.data.filter(tag => tag.title && tag.title.trim() !== "").map(tag => ({ label: tag.title, value: tag.title }));
        return filteredTags
    } catch (error) {
        console.error("Error while fetching tags: ", error);
    }
};

export const getRelatedArticlesExceptSelected = async (id) => {
    try {
        const articlesResponse = await axios.get(`${API_URL}/articles/except/${id}`);
        const filteredArticles = articlesResponse?.data.filter(article => article.title && article.title.trim() !== "").map(article => ({ label: article.title, value: article.title }));
        return filteredArticles
    } catch (error) {
        console.error("Error : " + error);
    }
}

export const getPicture = (item) => {
    return (<img src={`${PUBLIC_URL}${item}`} alt={item} />)
}

export const getArticles = async (setFilteredArticles) => {
    const response = await axios.get(`${API_URL}/articles`);
    setFilteredArticles(response.data);
}

export const getCoefficients = async (setFilteredCoefficients) => {
    const response = await axios.get(`${API_URL}/coefficients`);
    setFilteredCoefficients(response.data);
}

export const getLanguages = async (setFilteredLanguages) => {
    const response = await axios.get(`${API_URL}/languages`);
    setFilteredLanguages(response.data);
}

export const getRequestRegister = async (setFilteredRequestRegister) => {
    const response = await axios.get(`${API_URL}/requestRegister`);
    setFilteredRequestRegister(response.data);
}

export const getRequestForPoints = async (setFilteredRequestsForPoints) => {
    const response = await axios.get(`${API_URL}/requestForPoints`);
    setFilteredRequestsForPoints(response.data)
}

export const getResume = async (setFilteredResume) => {
    const response = await axios.get(`${API_URL}/resume`);
    setFilteredResume(response.data);
}

export const getStopList = async (setFilteredStopList) => {
    const response = await axios.get(`${API_URL}/stopList`);
    setFilteredStopList(response.data);
}

export const getTagsAdmin = async (setFilteredTags) => {
    const response = await axios.get(`${API_URL}/tags`);
    setFilteredTags(response.data);
}

export const getTestimonialsAdmin = async (setFilteredTestimonials) => {
    const response = await axios.get(`${API_URL}/testimonials`);
    setFilteredTestimonials(response.data);
}

export const getVacanciesAdmin = async (setFilteredVacancies) => {
    const response = await axios.get(`${API_URL}/vacancies`);
    setFilteredVacancies(response.data);
}

export const getAgents = async () => {
    const response = await axios.get(`${API_URL}/agents`);
    return response.data
}

export const getAgent = async (agent) => {
    const response = await axios.get(`${API_URL}/agents/${agent.id}`);
    return response.data
}

export const getUserBookings = async (setFilteredBookings, agent) => {
    const response = await axios.get(`${API_URL}/bookings/userId/${agent?.id}`);
    setFilteredBookings(response.data);
}

export const getUserRewards = async (setFilteredRewards, agent) => {
    const response = await axios.get(`${API_URL}/rewards/userId/${agent?.id}`);
    setFilteredRewards(response.data);
}











export const postVacancy = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/vacancies`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/vacancies');
    } else {
        alert('Error!');
    }
}

export const postArticle = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/articles');
    } else {
        alert('Error!');
    }
}

export const postTestimonial = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/testimonials');
    } else {
        alert('Error!');
    }
}

export const postStopList = async (salesId, username) => {
    return await axios.post(`${API_URL}/stopList`, {
        salesId,
        username
    });
}

export const postLanguage = async (code, title) => {
    return await axios.post(`${API_URL}/languages`, {
        code,
        title
    });
}

export const postTag = async (title) => {
    return await axios.post(`${API_URL}/tags`, { title });
}

export const postCoefficient = async (salesId, percentage) => {
    await axios.post(`${API_URL}/coefficients`, {
        salesId,
        percentage
    });
}

export const postReward = async (userId, type, pool, amount, comment) => {
    await axios.post(`${API_URL}/rewards`, {
        userId,
        type,
        pool,
        amount,
        comment
    });
}

export const updateAgentEmail = async (email, agent) => {
    const res = await axios.patch(`${API_URL}/agents/${agent.id}`,{
        email
    });
    return res
}
















export const putVacancy = async (formData, navigate, vacancy) => {

    formData.forEach(item => {
        console.log(item);
    })

    try {
        const responce = await axios.put(`${API_URL}/vacancies/${vacancy.id}`, formData)
        if (responce.status === 200) {
            navigate('/vacancies')
        } else {
            alert('Error!')
        }
    } catch (error) {
        console.error('Error updating vacancy:', error);
    }
}

export const putArticle = async (formData, navigate, article) => {
    const response = await axios.put(`${API_URL}/articles/${article.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
        console.log('Article saved successfully:', response.data);
        navigate('/articles');
    } else {
        console.error('Error saving article:', response);
        alert('Error saving article!');
    }
}

export const putTestimonial = async (formData, navigate, testimonial) => {
    const response = await axios.put(`${API_URL}/testimonials/${testimonial.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (response.status === 200) {
        console.log('Testimonisl saved successfully:', response.data);
        navigate('/testimonials');
    } else {
        console.error('Error saving testimonial:', response);
        alert('Error saving testimonial!');
    }
}

export const putCoefficient = async (item, salesIdCoef, percentage) => {
    return await axios.put(`${API_URL}/coefficients/${item.id}`, { salesId: salesIdCoef, percentage });
}

export const putTags = async (item, titleTag) => {
    return await axios.put(`${API_URL}/tags/${item.id}`, { title: titleTag });
}

export const putLanguages = async (item, code, titleLanguage) => {
    return await axios.put(`${API_URL}/languages/${item.id}`, { code, title: titleLanguage });
}

export const putStopList = async (item, salesIdStopList, usernameStopList) => {
    return await axios.put(`${API_URL}/stopList/${item.id}`, { salesId: salesIdStopList, username: usernameStopList });
}

export const putPassword = async (username, password, newPassword) => {
    try {
        const responce = await axios.put(`${API_URL}/users/${username}`, {
            password: password,
            newPassword: newPassword
        })
        alert(responce.data.message)
    } catch (error) {
        console.error('Error', error);
    }
}

export const putRequestForPoints = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/requestForPoints/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error', error);
    }
};
















export const searchTags = async (titleTag, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/tags?title=${titleTag}`);
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

export const searchCoefficients = async (salesIdCoef, percentage, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/coefficients/search?salesId=${salesIdCoef}&percentage=${percentage}`);
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching coefficients:', error);
    }
};

export const searchLanguages = async (code, titleLanguage, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/languages/search?code=${code}&title=${titleLanguage}`)
        setFilteredItems(responce.data);
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
};

export const searchStopList = async (salesIdStopList, usernameStopList, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/stopList/search?salesId=${salesIdStopList}&username=${usernameStopList}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching stop list:', error);
    }
};

export const searchVacancies = async (titleVacancy, statusVacancy, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/vacancies/search?title=${titleVacancy}&status=${statusVacancy}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching vacancies:', error);
    }
};

export const searchResume = async (nameResume, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/resume/search?name=${nameResume}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching resume:', error);
    }
};

export const searchArticles = async (titleArticle, statusArticle, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/articles/search?title=${titleArticle || ''}&status=${statusArticle || ''}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

export const searchTestimonials = async (author, position, countOfStars, setFilteredItems) => {
    try {
        const responce = await axios.get(`${API_URL}/testimonials/search?author=${author}&position=${position}&countOfStars=${countOfStars}`)
        setFilteredItems(responce.data)
    } catch (error) {
        console.error('Error fetching testimonisls:', error);
    }
}

export const searchRequestRegister = async (firstName, lastName, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/requestRegister/search?firstName=${firstName}&lastName=${lastName}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching requests registration:', error);
    }
};

export const searchRequestForPoints = async (usernameRequestForPoints, email, startDate, endDate, setFilteredItems) => {
    try {
        let url = `${API_URL}/requestRegister/search?username=${usernameRequestForPoints}&email=${email}`;

        if (startDate) {
            url += `&startDate=${startDate.toISOString()}`;
        }
        if (endDate) {
            url += `&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(url);
        setFilteredItems(response.data);
    } catch (error) {
        console.error('Error fetching requests registration:', error);
    }
};




















export const deleteArticle = async (id) => {
    return await axios.delete(`${API_URL}/articles/${id}`);
}

export const deleteCoefficient = async (id) => {
    return await axios.delete(`${API_URL}/coefficients/${id}`);
}

export const deleteLanguage = async (id) => {
    return await axios.delete(`${API_URL}/languages/${id}`);
}

export const deleteRequestRegister = async (id) => {
    return await axios.delete(`${API_URL}/requestRegister/${id}`);
}

export const deleteRequestForPoints = async (id) => {
    return await axios.delete(`${API_URL}/requestForPoints/${id}`);
}

export const deleteResume = async (id) => {
    return await axios.delete(`${API_URL}/resume/${id}`);
}

export const deleteStopList = async (id) => {
    return await axios.delete(`${API_URL}/stopList/${id}`)
}

export const deleteTags = async (id) => {
    return await axios.delete(`${API_URL}/tags/${id}`);
}

export const deleteTestimonials = async (id) => {
    return await axios.delete(`${API_URL}/testimonials/${id}`);
}

export const deleteVacancy = async (id) => {
    return await axios.delete(`${API_URL}/vacancies/${id}`);
}