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
			recommendedGames: [],
			searchedGames: []
		},
		actions: {
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
			}
		}
	};
};

export default getState;
