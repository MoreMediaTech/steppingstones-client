import { axiosInstance } from "@lib/axiosDefaultConfig";
import { IEmailFormData } from "@lib/types";

const sendEmail = async (data: IEmailFormData) => {
  const response = await axiosInstance.post("/email", data);
  return response.data.message;
}

export const emailService = {
    sendEmail,
}