export const responseSuccess = res => res;

export const responseError = ({ response }) => {
    return Promise.reject(response);
}