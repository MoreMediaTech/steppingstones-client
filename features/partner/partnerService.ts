import { axiosInstance } from '@lib/axiosDefaultConfig'
import { PartnerDataProps } from '@lib/types'


const createPartnerData = async (data: PartnerDataProps, token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axiosInstance.post('/partners', data)
    return response.data.message
}
const updatePartnerData = async (data: PartnerDataProps, token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axiosInstance.put(`/partners/${data.id}`, data)
    return response.data.message
}
const deletePartnerData = async (id: string, token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axiosInstance.delete(`/partners/${id}`)
    return response.data.message
}
const getPartnerDataById = async (id: string, token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axiosInstance.get(`/partners/${id}`)
    return response.data
}

const getAllPartnerData = async (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const response = await axiosInstance.get('/partners')
    return response.data
}

export const partnerService = {
    createPartnerData,
    updatePartnerData,
    deletePartnerData,
    getPartnerDataById,
    getAllPartnerData
}