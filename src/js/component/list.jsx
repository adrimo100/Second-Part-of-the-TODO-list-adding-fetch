import React, { useState, useEffect } from "react";

let auxList = [];

const url = "https://assets.breatheco.de/apis/fake/todos/user/adrimo100";

const List = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState("");

	useEffect(() => {
		createUser();
		downloadData();
	}, []);

	const createUser = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify(auxList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const downloadData = () => {
		fetch(url)
			.then((resp) => {
				if (!resp.ok)
					throw new Error("Get ha fallado. Código: " + resp.status);
				else {
					console.log("Get ha funcionado. Status: " + resp.status);
				}
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				auxList = data;
				setList(auxList);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateBackend = () => {
		if (auxList.length == 0) {
			fetch(url, {
				method: "DELETE",
				body: JSON.stringify(auxList),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((resp) => {
					if (!resp.ok)
						throw new Error(
							"DELETE ha fallado. Código: " + resp.status
						);
					else {
						console.log(
							"DELETE ha funcionado. Status: " + resp.status
						);
					}
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then((data) => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch((error) => {
					//error handling
					console.log(error);
				});
		} else {
			fetch(url, {
				method: "PUT",
				body: JSON.stringify(auxList),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((resp) => {
					if (!resp.ok)
						throw new Error(
							"PUT ha fallado. Código: " + resp.status
						);
					else {
						console.log(
							"PUT ha funcionado. Status: " + resp.status
						);
					}
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then((data) => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch((error) => {
					//error handling
					console.log(error);
				});
		}
	};

	const renderList = (item, i) => {
		return (
			<li className="list-group-item" key={i}>
				{item.label}
				<button
					className="btn btn-danger float-end"
					onClick={(e) => {
						const newList = auxList.filter(
							(elem) => elem.label != item.label
						);

						auxList = newList;
						updateBackend();
						setList(auxList);
						console.log("Lista después de borrado:");
						console.log(list);
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-x-lg"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
						/>
						<path
							fillRule="evenodd"
							d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
						/>
					</svg>
				</button>
			</li>
		);
	};

	return (
		<div className="mt-5 d-flex justify-content-center align-items-center">
			<div className="text-center" style={{ width: "50%" }}>
				<h1>Todo List</h1>
				<ul className="list-group">
					<li className="list-group-item">
						<input
							type="text"
							placeholder="Press enter to add item"
							style={{ width: "60%" }}
							onChange={(e) => {
								setValue(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter" && value != "") {
									auxList.push({
										label: value,
										done: false,
									});
									setList(auxList);
									setValue("");
									updateBackend();
									e.target.value = "";
								}
							}}
						/>
					</li>

					{auxList.map(renderList)}
				</ul>
			</div>
		</div>
	);
};

export default List;
