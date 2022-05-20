import axiosPrivateInstance  from '@lib/axiosDefaultConfig';
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import { PartnerDataProps } from '@lib/types'


const createPartnerData = async (data: PartnerDataProps, token: string) => {
    const axiosPrivateInstance = useAxiosPrivate()
    const response = await axiosPrivateInstance.post('/partners', data)
    return response.data.message
}
const updatePartnerData = async (data: PartnerDataProps, token: string) => {
    const axiosPrivateInstance = useAxiosPrivate()
    const response = await axiosPrivateInstance.put(
      `/partners/${data.id}`,
      data
    )
    return response.data.message
}
const deletePartnerData = async (id: string, token: string) => {
    const axiosPrivateInstance = useAxiosPrivate()
    const response = await axiosPrivateInstance.delete(`/partners/${id}`)
    return response.data.message
}
const getPartnerDataById = async (id: string, token: string) => {
    const axiosPrivateInstance = useAxiosPrivate()
    const response = await axiosPrivateInstance.get(`/partners/${id}`)
    return response.data
}

const getAllPartnerData = async (token: string) => {
    const axiosPrivateInstance = useAxiosPrivate()
    const response = await axiosPrivateInstance.get('/partners')
    return response.data
}

export const partnerService = {
    createPartnerData,
    updatePartnerData,
    deletePartnerData,
    getPartnerDataById,
    getAllPartnerData
}