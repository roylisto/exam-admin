export function PostData (type, data) {
	
	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+type, {
			method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
			body: JSON.stringify(data),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			resolve(responseJson);
		})
		.catch((error) => {
			reject(error);
		});
	}); 
}