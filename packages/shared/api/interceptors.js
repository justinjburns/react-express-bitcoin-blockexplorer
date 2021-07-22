exports.responseSuccess = res => res;

exports.responseError = ({ response }) => {
    return Promise.reject(response);
}