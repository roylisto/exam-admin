export function PostData (type, data) {
	
	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+type, {
			method: 'POST',
            headers: {
              'Content-Type': 'application/json',
			  'Accept': 'application/json',
			  'x-access-token' : localStorage.getItem("token")
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

export function GetData (type, data) {
	
	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+type, {
			method: 'GET',
            headers: {
              'Content-Type': 'application/json',
			  'Accept': 'application/json',
			  'x-access-token' : data
            },
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