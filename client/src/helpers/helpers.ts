import { enqueueSnackbar } from "notistack";
import { SERVER_URL } from "../constants/constants";
import { AxiosResponse } from "axios";

export async function PublicURLCreator(path:string) {
    return `${SERVER_URL}/${path}`
}

export function showErrorMessage(err: any) {
    enqueueSnackbar(err.response.data.message, {variant:"error"})
}
export function showSuccessMessage(res: AxiosResponse) {
    enqueueSnackbar(res.data.message, {variant:"success"})
}

export function showWarningMessage(message: string) {
    enqueueSnackbar(message, {variant:"warning"})
}
