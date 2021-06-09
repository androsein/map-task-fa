const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=';
export function checkApi(api){
    if(!api){
        return Promise.reject({
            error: true,
            reason: 'empty api passed'
        });
    }
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}${api}`)
            .then(raw => raw.json())
            .then(response => {
                response.status === 'OK' ? 
                    resolve({
                        error: false,
                        status: response.status
                    }) :
                    reject({
                        error: true,
                        reason: 'invalid api key'
                    })
            })
    })
}
