import React, { useEffect, useContext, useState } from "react";
import { UserProfileCard } from "./profile_user.jsx";
import { Context } from "../store/appContext";

export const UserInformation = ({ userId }) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        setLoading(false);
        await actions.getUserProfile(userId);
        if (isMounted) {
          setLoading(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    if (shouldFetch) {
      fetchUserProfile();
      setShouldFetch(false);
    }

    return () => {
      isMounted = false;
    };
  }, [userId, actions, shouldFetch]);

  const userProfile = store.userProfile || {};
  const platforms = userProfile.platform || [];
  const favoriteGames = store.favoriteGames || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const platformIconsMap = {
    steam: "steam",
    "play station": "playstation",
    switch: "nintendo-switch",
    xbox: "xbox",
  };

  const platformIcons = platforms.map((platform) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    icon: platformIconsMap[platform] || platform,
  }));

  return (
    <div className="user-information">
      <section id="profile_information">
        <UserProfileCard {...userProfile} />
      </section>
      <section
        id="profile_platforms"
        className="background-user-platforms mt-5 custon-border"
      >
        <div className="row">
          <div className="col-12 text-center mb-3 g-4">
            <h3>Platforms</h3>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <div className="row justify-content-center">
              {platformIcons.length > 0 ? (
                platformIcons.map((platform, index) => (
                  <div key={index} className="col-md-4 mb-3 mt-3">
                    <div
                      className="card text-center custom-card-platforms"
                      style={{ minWidth: "12rem" }}
                    >
                      <div className="card-body">
                        <i className={`fab fa-${platform.icon} fa-2x`}></i>
                        <h5 className="card-title">{platform.name}</h5>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  No platforms available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="profile_games"
        className="container background-user-platforms mt-5 custon-border"
      >
        <div className="row">
          <div className="col-12 text-center mb-3">
            <h3>Games</h3>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <div className="row justify-content-center">
              {favoriteGames.length > 0 ? (
                favoriteGames.map((game, index) => (
                  <div key={index} className="col-md-4 mb-3 mt-3">
                    <div
                      className="card text-center custom-card-games-recomended"
                      style={{ minWidth: "12rem" }}
                    >
                      <div className="card">
                        <img
                          src={game.background_image}
                          alt=""
                          className="img-fluid"
                          style={{
                            objectFit: "cover",
                            height: "200px",
                            width: "100%",
                          }}
                        />
                        <div
                          className="card-footer"
                          style={{ backgroundColor: "#575757" }}
                        >
                          <h5 className="text-white">{game.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-6 text-center">
                  No favorite games available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
