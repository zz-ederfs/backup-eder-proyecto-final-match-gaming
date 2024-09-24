import React from "react";
import logo from "../../../img/logo/logo-marca.png"
import {Member} from "../../component/create_session/member.jsx"


export const InfoSession = () => {
    return(
        <div className="d-flex flex-column align-items-center min-vh-100 pb-3" style={{ backgroundColor: "#16171C", color: "#fff" }}>
            <img src={logo} alt="Logo" style={{ width: '40%', height: '80px', margin: '10px', objectFit: "contain" }} />
            <div className="w-75 my-auto" style={{ backgroundColor: "rgb(18 19 20)", borderRadius: "8px" }}>
                <div className="container text-center">
                    <div className="row justify-content-center align-items-center">
                        <h2 className="mt-4 mb-2 fw-bold text-start">Session:</h2>
                        <div className="container w-100 h-100">
                            {/* Busqueda */}
                            <div className="container">
                            <div className="row">
                            <div className="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center" style={{backgroundImage: `url("https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg")`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "250px", boxShadow: "inset 0px 0px 180px rgba(0, 0, 0, 0.5)", marginBottom: "50px", borderRadius: "20px"}}>
                                <div style={{width: "220px", height: "220px", borderRadius: "50%", overflow: "hidden", border: "2px solid white", marginTop: "60px",}}>
                                    <img src="https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="Perfil" style={{ width: "100%", height: "100%", objectFit: "cover", }}/>
                                </div>
                                <div className="mb-4" style={{width: "85%", padding: "1.7rem", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "15px", marginTop: "100px"}}>
                                <h4 className="">THE LAST OF US</h4>
                                <h5 className="text-start mt-4">Nombre de host</h5>
                                <h5 className="text-start">Duración</h5>
                                <h5 className="text-start">Lenguage</h5>                        
                                <h5 className="text-start">Region</h5>
                                </div>                                                          
                            </div>
                                <div className="col-12 col-lg-7 d-flex flex-column">
                                    <div className="bg-black p-2" style={{borderRadius: "15px"}}>
                                        <h5 className="text-start">Description:</h5>
                                        <div className="bg-dark p-2" style={{borderRadius: "5px"}}>
                                            <p className="text-start">
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis incidunt officiis velit natus magni, provident blanditiis beatae vitae, nulla asperiores libero aperiam, accusamus iste quidem porro explicabo. Perferendis, quis sunt.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-black p-2 mt-2" style={{borderRadius: "15px"}}>
                                        <h5 className="text-start">Members:</h5>
                                        <div className="p-1" style={{borderRadius: "5px", overflow: "scroll", height: "370px"}}>
                                            <Member username={"Anjhelo"}/>
                                            <Member username={"Anjhelo"}/>
                                            <Member username={"Anjhelo"}/>
                                            <Member username={"Anjhelo"}/>
                                            <Member username={"Anjhelo"}/>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}