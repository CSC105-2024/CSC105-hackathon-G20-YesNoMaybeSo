const JsonResponse = (success: boolean, msg: string, data?: any) => {
    return {
        success: success,
        data: data ? data : null,
        msg: msg
    }
}

export { JsonResponse };