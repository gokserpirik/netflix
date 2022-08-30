import React, { useEffect, useState } from "react";
import "./Style/HomePage.css";
import { auth, db } from "./Provider/firebase";
import WatchProfile from "./WatchProfile";

function HomePage({ user }) {
  const [profileSelected, setProfileSelected] = useState();
  const [userData, setuserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        setuserData(doc.data());
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!profileSelected ? (
        <div className="home">
          <div className="homeProfile">
            <div className="homeProfileHeader">
              <img src="./Logo.png" className="homeProfileHeader__logo" />
            </div>

            <div className="HomeProfileContent">
              <div className="HomeProfileContent__title">Who's watching?</div>

              <div className="HomeProfileContent__profiles">
                {loading ? (
                  <div> Loading </div>
                ) : (
                  userData.profiles.map((item) => (
                    <div
                      className="HomeProfileContent__profiles__profile"
                      onClick={() => setProfileSelected(item)}
                    >
                      <div>
                        <img
                          src={item.pic}
                          className="HomeProfileContent__profiles__profile__img"
                        />
                      </div>
                      <div className="HomeProfileContent__profiles__profile__name">
                        {item.name}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                className="HomeProfileContent__out"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      ) : (
        <WatchProfile profile={profileSelected} goBack={setProfileSelected} />
      )}
    </div>
  );
}

export default HomePage;
