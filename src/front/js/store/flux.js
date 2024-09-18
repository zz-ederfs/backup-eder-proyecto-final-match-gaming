const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,  // Almacena el token del usuario
			recommendedGames: [],
			searchedGames: []
		},
		actions: {

			loginUser: async (username, password) => {
				try {
				  console.log("Backend URL:", process.env.BACKEND_URL);
				  const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  "Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify({ username, password }),
				  });
			  
				  if (response.ok) {
					const data = await response.json();
					localStorage.setItem("token", data.access_token);  // Almacena el token
					setStore({ token: data.access_token });
					return true;
				  } else {
					console.error("Login error:", await response.json());
					return false;
				  }
				} catch (error) {
				  console.error("Error during login", error);
				  return false;
				}
			  },
			  
			// Verificar si el usuario sigue autenticado
			isAuthenticated: () => {
				const store = getStore();
				return store.token !== null; // Aquí podrías incluir una verificación adicional si el token es válido
			},
			// Función para cerrar sesión
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null, authMessage: null });
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			registerUser: async (data) => {
                try {
                    let response = await fetch("https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/users", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    
                    let responseData = await response.json();
                    
                    if (response.status === 200) {
                        return true;
                    } else {
                        console.error("Error:", responseData);
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
			getRecommendedGames_gameSelection: async (number_games) => {
                try {
                    const response = await fetch(`https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/games_recommended/${number_games}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ recommendedGames: data });
						console.log("hola")
                    } else {
                        console.error("Error:", response.statusText);
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
			
			getGameByName_gameSelection: async (game_name) => {
				try {
					const response = await fetch(`https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/search_game?name=${game_name}`);
					if (response.ok) {
						const data = await response.json();
						setStore({ searchedGames: data });
						console.log("Game search successful");
					} else {
						console.error("Error:", response.statusText);
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			getGamesRecomended: async (number_games = 3) => {
				try {
				  const resp = await fetch(
					`${process.env.BACKEND_URL}/api/games_recommended/${number_games}`
				  );
				  if (!resp.ok) {
					throw new Error("Network response was not ok");
				  }
				  const data = await resp.json();
				  setStore({ games: data });
				  return data;
				} catch (error) {
				  console.log("Error loading games from backend", error);
				}
			  }
		}
	};
};

export default getState;
