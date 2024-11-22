import axios from "axios";
import { API_URL, PUBLIC_URL } from "./config";
import { notification } from 'antd'

export const getTags = async () => {
    try {
        const response = await axios.get(`${API_URL}/tags`);
        return response.data
    } catch (error) {
        console.error(error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const getBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/articles/search?status=active`);
        console.log(API_URL);

        return response.data
    } catch (error) {
        console.error(error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
            notification.error({
                message: 'Error',
                description: 'The server is not responding',
                duration: 3
            });
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
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
}

export const getTestimonials = async (relation) => {
    try {
        const response = await axios.get(`${API_URL}/testimonials/search?relation=${relation}`)
        return response.data
    } catch (error) {
        console.error(error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
}

export const getUserFromLoyalty = async (salesId, username) => {
    try {
        const response = await axios.get(`${API_URL}/stopList/searchStopList`, {
            params: { salesId, username }
        });

        const { isBlocked, reason } = response.data;

        if (isBlocked) {
            notification.error({
                message: 'Access Denied',
                description: reason || 'Your actions with the loyalty program are blocked',
                duration: 3
            });
            return undefined;
        }

        return await axios.get(`${API_URL}/agents/pointsData/${username}/${salesId}`);

    } catch (error) {
        console.error('Error in getUserFromLoyalty:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
        return undefined;
    }
};

export const refreshDataInTablesAgentsAndBookings = async (reservationsResponse) => {
    const reservations = reservationsResponse.data._embedded.reservation;
    try {
        await Promise.all(
            reservations.map(async (reservation) => {
                const agentData = {
                    id: reservation.agent?.id || null,
                    reseller: reservation.reseller?.id || null,
                    salesId: reservation.reseller?.code || null,
                    username: reservation.agent?.username || null,
                    email: reservation.agent?.email || null,
                    name: reservation.agent?.name || null,
                };

                const bookingData = {
                    id: reservation.id || null,
                    userId: reservation.agent?.id || null,
                    sellingPrice: reservation.service?.prices?.total?.net?.value || null,
                    currency: reservation.service?.prices?.total?.net?.currency || null,
                };

                await axios.post(`${API_URL}/agents`, agentData);
                await axios.post(`${API_URL}/bookings`, bookingData);
            })
        );

        return notification.success({
            message: 'Successful',
            description: 'New data has been saved',
            duration: 3,
        });
    } catch (error) {
        console.error('Error processing reservations:', error);

        return notification.error({
            message: 'Error',
            description: 'Failed to save all data',
            duration: 3,
        });
    }
}















export const postAuth = async (salesId, username) => {
    try {
        const response = await axios.post(`${API_URL}/auth/token`, {
            username: salesId,
            password: username
        })
        localStorage.setItem('authToken', JSON.stringify(response.data.access_token))
        localStorage.setItem('username', salesId)
        return response
    } catch (error) {
        console.error(error)
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
}

export const postResume = async (formData, navigate) => {
    try {
        const res = await axios.post(`${API_URL}/resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.status === 200 || res.status === 204) {
            notification.success({
                message: 'Successful',
                description: 'Form submitted successfully!',
                duration: 3
            });
            navigate('/')
        } else {
            notification.error({
                message: 'Error',
                description: 'There was an error submitting the form.',
                duration: 3
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
            notification.success({
                message: 'Successful',
                description: 'Your information has been sent.',
                duration: 3
            });
            navigate('/')
        } else {
            notification.error({
                message: 'Error',
                description: 'Error in sending information',
                duration: 3
            });
        }
    } catch (error) {
        console.error(error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const postRequestForPoints = async (formData, onClose) => {
    try {

        formData.forEach(element => {
            console.log(element);
        });

        const response = await axios.post(`${API_URL}/requestForPoints`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);


        if (response.status === 200) {
            notification.success({
                message: 'Successful',
                description: 'Your information has been sent.',
                duration: 3
            });
            onClose();
        } else {
            notification.error({
                message: 'Error',
                description: 'Error in sending information',
                duration: 3
            });
        }
    } catch (error) {
        console.error(error)
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
}























export const getTagsFromArticlesAdd = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        return tagsResponse.data.map(tag => ({ value: tag.title, label: tag.title }));
    } catch (error) {
        console.error("Error while fetching tags: ", error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};
export const getRelatedArticlesAdmin = async () => {
    try {
        const articles = await axios.get(`${API_URL}/articles`);
        return articles.data.map(article => ({ value: article.title, label: article.title }));
    } catch (error) {
        console.error("Error : " + error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const getTagsFromArticlesEdit = async () => {
    try {
        const tagsResponse = await axios.get(`${API_URL}/tags`);
        const filteredTags = tagsResponse?.data.filter(tag => tag.title && tag.title.trim() !== "").map(tag => ({ label: tag.title, value: tag.title }));
        return filteredTags
    } catch (error) {
        console.error("Error while fetching tags: ", error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const getRelatedArticlesExceptSelected = async (id) => {
    try {
        const articlesResponse = await axios.get(`${API_URL}/articles/except/${id}`);
        const filteredArticles = articlesResponse?.data.filter(article => article.title && article.title.trim() !== "").map(article => ({ label: article.title, value: article.title }));
        return filteredArticles
    } catch (error) {
        console.error("Error : " + error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
    localStorage.removeItem('countAgents')
    localStorage.setItem('countAgents', response.data.length)
    return response.data
}

export const getAgent = async (agent) => {
    const response = await axios.get(`${API_URL}/agents/${agent.id}`);
    return response.data
}

export const getUserBookings = async (setFilteredBookings, agent) => {
    const bookings = await axios.get(`${API_URL}/bookings/userId/${agent?.id}`);
    setFilteredBookings(bookings.data);
}

export const getUserRewards = async (setFilteredRewards, agent) => {
    const response = await axios.get(`${API_URL}/rewards/userId/${agent?.id}`);
    setFilteredRewards(response.data);
}

export const getGlobalSetting = async () => {
    const response = await axios.get(`${API_URL}/globalSetting`)
    return response.data
}











export const postGlobalSetting = async (percentage, days) => {
    const response = await axios.post(`${API_URL}/globalSetting`, { percentage, days })
    console.log(response);
    return response.data
}

export const postVacancy = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/vacancies`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/admin/vacancies');
        return notification.success({
            message: 'Successful',
            description: 'New vacancy has been created.',
            duration: 3
        });
    }
}

export const postArticle = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/admin/articles');
        return notification.success({
            message: 'Successful',
            description: 'New articles has been created.',
            duration: 3
        });
    }
}

export const postTestimonial = async (formData, navigate) => {
    const response = await axios.post(`${API_URL}/testimonials`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.status === 200) {
        navigate('/admin/testimonials');
        return notification.success({
            message: 'Successful',
            description: 'New testimonial has been created.',
            duration: 3
        });
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
    return await axios.post(`${API_URL}/coefficients`, {
        salesId,
        percentage
    })
}

export const postReward = async (userId, type, pool, amount, comment) => {
    return await axios.post(`${API_URL}/rewards`, {
        userId,
        type,
        pool,
        amount,
        comment
    });
}

export const updateAgentEmail = async (email, agent) => {
    return await axios.patch(`${API_URL}/agents/${agent.id}`, {
        email
    });
}
















export const putVacancy = async (formData, navigate, vacancy) => {
    try {
        const responce = await axios.put(`${API_URL}/vacancies/${vacancy.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (responce.status === 200) {
            navigate('/admin/vacancies');
            return notification.success({
                message: 'Successful',
                description: 'Vacancy has been updated.',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error updating vacancy:', error);
        return notification.error({
            message: 'Error',
            description: 'Internal server error',
            duration: 3
        });
    }
}

export const putArticle = async (formData, navigate, article) => {
    try {
        const response = await axios.put(`${API_URL}/articles/${article.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            navigate('/admin/articles');
            return notification.success({
                message: 'Successful',
                description: 'Article has been updated.',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error updating article:', error);
        return notification.error({
            message: 'Error',
            description: 'Internal server error',
            duration: 3
        });
    }
}

export const putTestimonial = async (formData, navigate, testimonial) => {
    try {
        const response = await axios.put(`${API_URL}/testimonials/${testimonial.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            navigate('/admin/testimonials');
            return notification.success({
                message: 'Successful',
                description: 'Testimonial has been updated.',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return notification.error({
            message: 'Error',
            description: 'Internal server error',
            duration: 3
        });
    }
}

export const putCoefficient = async (item, salesIdCoef, percentage) => {
    return await axios.put(`${API_URL}/coefficients/${item.id}`, { salesId: salesIdCoef, percentage });
}

export const putTag = async (item, titleTag) => {
    return await axios.put(`${API_URL}/tags/${item.id}`, { title: titleTag });
}

export const putLanguage = async (item, code, titleLanguage) => {
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
        if (responce.status === 200) {
            notification.success({
                message: 'Successful',
                description: 'Password has been changed',
                duration: 3
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};
















export const searchTags = async (titleTag, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/tags?title=${titleTag}`);
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching tags:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchCoefficients = async (salesIdCoef, percentage, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/coefficients/search?salesId=${salesIdCoef}&percentage=${percentage}`);
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching coefficients:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchLanguages = async (code, titleLanguage, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/languages/search?code=${code}&title=${titleLanguage}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching languages:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchStopList = async (salesIdStopList, usernameStopList, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/stopList/search?salesId=${salesIdStopList}&username=${usernameStopList}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching stop list:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchVacancies = async (titleVacancy, statusVacancy, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/vacancies/search?title=${titleVacancy}&status=${statusVacancy}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching resume:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchArticles = async (titleArticle, statusArticle, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/articles/search?title=${titleArticle || ''}&status=${statusArticle || ''}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchTestimonials = async (author, position, countOfStars, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/testimonials/search?author=${author}&position=${position}&countOfStars=${countOfStars}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching testimonisls:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching requests registration:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching requests registration:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
    }
};

export const searchAgents = async (reseller, salesIdAgent, usernameAgent, setFilteredItems) => {
    try {
        const response = await axios.get(`${API_URL}/agents/search?reseller=${reseller || ''}&salesId=${salesIdAgent || ''}&username=${usernameAgent || ''}`)
        if (response.status === 200) {
            setFilteredItems(response.data)
            notification.success({
                message: 'OK',
                description: `Number of records found: ${response.data.length}`,
                duration: 3
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Data retrieval error',
                duration: 3
            });
        }
    } catch (error) {
        console.error('Error fetching agents:', error);
        notification.error({
            message: 'Error',
            description: 'The server is not responding',
            duration: 3
        });
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