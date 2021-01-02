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

export function GetData (type, params) {
	let route = (params) ?
					process.env.REACT_APP_SERVER_URL+type+params :
					process.env.REACT_APP_SERVER_URL+type

	return  new Promise((resolve, reject) => {
		fetch(route, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token' : localStorage.getItem("token")
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

export function UpdateData (type, data) {

	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+type+"/"+data.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token' : localStorage.getItem("token")
      },
			body: JSON.stringify(data.payload),
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

export function DeleteData (type, id) {

	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+type+"/"+id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token' : localStorage.getItem("token")
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

export function Delete (endpoint) {
	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+endpoint, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'x-access-token' : localStorage.getItem("token")
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

export function Upload (endpoint, data) {
	return  new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_SERVER_URL+endpoint, {
			method: 'POST',
			headers: {
				'x-access-token' : localStorage.getItem("token")
      },
			body: data,
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