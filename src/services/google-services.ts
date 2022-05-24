const apiKey = "AIzaSyB2EwXPeAOlS9uxkgKRylL3OdpCArMF43s"
export const GepCepInfo = async (cep: string) =>{
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${apiKey}`)
    .then((response) => response.json())
    .then(resp=>{
        if(resp.status=="OK"){
            return resp.results[0]
        }
        return null
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}

