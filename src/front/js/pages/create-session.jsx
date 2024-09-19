import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logo/logo-marca.png"
import { Link } from "react-router-dom";
import { GameSession } from "../component/create_session/game_card_session.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/game_selection.css"

export const CreateSession = () => {

    const { actions, store } = useContext(Context);
    const [gameSearch, setGameSearch] = useState(""); 
    const [filteredGames, setFilteredGames] = useState([]);
    const [formData, setFormData] = useState({start_date: "", duration: "", language: "", session_type: "", region: "", capacity: "", description: "", background_img: null, game_id: ""});
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [formComplete, setFormComplete] = useState(false);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            background_img: backgroundImage
        }));
    }, [backgroundImage]);


    useEffect(()=> {
        actions.getRecommendedGames_gameSelection(15)
    }, [])

    const isFormComplete = () => {
        return (
            formData.start_date !== "" &&
            formData.duration !== "" &&
            formData.language !== "" &&
            formData.session_type !== "" &&
            formData.region !== "" &&
            formData.capacity !== "" &&
            formData.description !== "" &&
            formData.background_img !== null &&
            filteredGames !== null
        );
    }
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();  
    
        if (value.length > 0) { 
            const filtered = store.recommendedGames.filter((game) => 
                game.name.toLowerCase().includes(value)  
            );
            setFilteredGames(filtered);
            console.log(filteredGames)
        } else {
            setFilteredGames([]);
        }
    };

    const handleGameSelect = (gameName) => {
        actions.getGameByName_gameSelection(gameName)
        setGameSearch(gameName); 
        setFilteredGames([]); 
        console.log("searched game", store.searchedGames)
    };

    const getFormData = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setFormComplete(isFormComplete());
        console.log(formComplete)
    }





    return(
        <div className="d-flex flex-column align-items-center min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="w-75 my-auto" style={{backgroundColor: "rgb(18 19 20)", borderRadius: "8px"}}>
    <div className="container text-center">
        <div className="row justify-content-center align-items-center">
            <h2 className="my-4 fw-bold" >New Session</h2>
            <form className="row g-3">

                {/* Buscar-juego */}
                <div className="col-12 col-lg-4">
                    <div className="px-3 p-1">
                        <label className="mb-1">Search game</label>
                    <div className="search-container d-flex" role="search">
                        <input className="form-control"  required style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}} type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </div>
                    </div>
                        {filteredGames.length > 0 && (
                        <ul className="list-group search-results">
                            {filteredGames.map((game) => (
                                <li key={game.id} className="list-group-item bg-dark text-white" onClick={() => handleGameSelect(game.name)}>
                                    {game.name}
                                </li>
                            ))}
                        </ul>
                        )}
                        {gameSearch && filteredGames.length === 0 && (
                        <div className="text-center px-3">
                            <GameSession imagen={store.searchedGames[0]?.background_image} name={store.searchedGames[0]?.name}/>
                        </div>)}
                    
                </div>
                <div className="col-12 col-lg-8">
                {/* form */}
                <div className="row">
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Start Date</label>
                        <input type="date" name="start_date" className="form-control" onChange={getFormData} style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Duration</label>
                        <select name="duration" class="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select duration</option>
                            <option value="UNK">Unknown</option>
                            <option value="ONE">One Hour</option>
                            <option value="TWO">Two Hours</option>
                            <option value="THREE">Three Hours</option>
                        </select>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Language</label>
                        <select name="language" class="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select language</option>
                            <option value="ENGLISH">English</option>
                            <option value="SPANISH">Spanish</option>
                            <option value="PORTUGUESE">Portuguese</option>
                        </select>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Session Type</label>
                        <select name="session_type" class="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select type</option>
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                        </select>
                    </div>
                    <div className="col-md-8 py-1">
                        <label className="form-label mb-1">Region</label>
                        <select name="region" class="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select region</option>
                            <option value="NA">North America</option>
                            <option value="SA">South America</option>
                        </select>
                    </div>
                    <div className="col-md-4 py-1">
                        <label className="form-label mb-1">Capacity</label>
                        <input name="capacity" type="number" onChange={getFormData} className="form-control" min="1" max="5" onInput={(e) => {if (e.target.value > 5) {e.target.value = 5}}} style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-md-12 py-1">
                        <label className="form-label mb-1">Background</label>
                        <input type="file" className="form-control" onChange={(e) => setBackgroundImage(e.target.files[0])} style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-md-12 py-1">
                        <label className="form-label mb-1">Description</label>
                        <textarea class="form-control" name="description" onChange={getFormData} rows="2" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}></textarea>
                    </div>

                {/* boton */}
                </div>
                    <div className="text-center py-3 my-4">
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <Link to="/age-verification">
                                <button className="btn btn-prev"><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                            </Link>
                            {formComplete ? (
                            <Link to="/platform-selection">
                                <button className="btn btn-prev">
                                    Continue<i className="fa-solid fa-arrow-right ms-2"></i>
                                </button>
                            </Link>
                            ) : (
                            <button className="btn btn-prev" disabled>
                                Continue<i className="fa-solid fa-arrow-right ms-2"></i>
                            </button>)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
        </div>
    </div>
    )
}