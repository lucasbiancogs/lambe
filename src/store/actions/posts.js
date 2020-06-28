import {
    SET_POSTS,
    CREATING_POST,
    POST_CREATED } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const addPost = post => {
    /*
    O caminho base já foi setado no axios, porém o caminho das postagens
    tem de ser nomeado e terminar com .json
    */
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-lambe-5f236.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
        .catch(err => {
            dispatch(setMessage({
                title: 'Erro',
                text: `Ocorreu um erro inesperado, contate a central de atendimento.`
            }))
        })
        .then(res => {
            post.image = res.data.imageURL
            axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                .catch(err => {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: `Ocorreu um erro inesperado, contate a central de atendimento.`
                    }))
                })
                .then(res => {
                    dispatch(getPosts())
                    dispatch(postCreated())
                    dispatch(setMessage({
                        title: 'Sucesso',
                        text: 'Nova Postagem!'
                    }))
                })
        })
    }

}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: `Ocorreu um erro inesperado, contate a central de atendimento.`
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: `Ocorreu um erro inesperado, contate a central de atendimento.`
                        }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                    })
            })
    }
}

const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: `Ocorreu um erro inesperado, contate a central de atendimento.`
                }))
            })
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }

                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST,
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}