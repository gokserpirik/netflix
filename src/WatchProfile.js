import axios from "axios";
import "./Style/WatchProfile.css";
import {
  FaBell,
  FaSearch,
  FaCaretDown,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState, useEffect } from "react";

function WatchProfile({ profile, goBack }) {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [recommend, setRecommend] = useState([]);

  const removeDuplicates = (arr) => {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) === -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  };

  const axiosData = (what, s, search) => {
    axios
      .get("https://api.tvmaze.com/" + what + s + "=" + search)
      .then((res) => {
        if (s === "q") {
          setRecommend((data) => data.concat(res.data));
        }
        if (s === "imdb") {
          setData((data) => data.concat(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (profile.userContent.watching) {
      profile.userContent.watching.forEach(async (element) => {
        axiosData("lookup/shows?", "imdb", element);
      });
    }

    if (profile.userContent.recommendKeywords) {
      profile.userContent.recommendKeywords.forEach(async (element) => {
        if (element.type === "people") {
          axiosData("search/people?", "q", element);
        }
        if (element.type === "keyword") {
          axiosData("search/shows?", "q", element);
        }
      });
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="watch">
      <div className="watch__p">
        <div className="watchHeader">
          <div className="watchHeader__left">
            <img src="./Logo.png" className="watchHeader__logo" />
            <div className="watchHeader__bar__item">Home</div>
            <div className="watchHeader__bar__item">Series</div>
            <div className="watchHeader__bar__item">Films</div>
            <div className="watchHeader__bar__item">New & Popular</div>
            <div className="watchHeader__bar__item">My List</div>
            <div className="watchHeader__bar__item">Browse by Languages</div>
          </div>

          <div className="watchHeader_right">
            <FaSearch id="searchIcon" />
            <div className="watchHeader__bar__item">Children</div>
            <FaBell id="bellIcon" />
            <img src={profile.pic} id="watchHeader__img" />
            <FaCaretDown id="caret" onClick={() => goBack("")} />
            {/* There is no menu connected to caret yet, so I use it as profileSelected disposer. */}
          </div>
        </div>

        <div className="watchFeatured">
          <div className="watchFeatured__title">
            <div className="watchFeatured__title__show">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Seinfeld_English_logo.png/1200px-Seinfeld_English_logo.png" />
            </div>
            <div className="watchFeatured__title__buttons">
              <div className="watchFeatured__title__buttons__play">
                <div className="watchFeatured__title__button">
                  <FaPlay /> Play
                </div>
              </div>
              <div className="watchFeatured__title__buttons__more">
                <div className="watchFeatured__title__button">
                  <AiOutlineInfoCircle /> More Info
                </div>
              </div>
            </div>
          </div>
          <video
            className="videobg"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
            autoPlay
            muted
            loop
          ></video>
        </div>
      </div>

      <div className="watchContent">
        <div className="watchContentCard">
          <div className="watchContentCard__title">
            Continue Watching for {profile.name}
          </div>
          <div className="watchContentCard__content">
            {!isloading &&
              data.map((item) =>
                item.image ? (
                  <div className="watchContentCard__content__item">
                    <img
                      className="watchContentCard__content__item__image"
                      src={item.image.original}
                    />
                  </div>
                ) : null
              )}
          </div>
        </div>

        <div className="watchContentCard">
          <div className="watchContentCard__title">Recommended</div>
          <div className="watchContentCard__content">
            {!isloading &&
              recommend.map((item) =>
                item.show.image ? (
                  <div className="watchContentCard__content__item">
                    <img
                      className="watchContentCard__content__item__image"
                      src={item.show.image.original}
                    />
                  </div>
                ) : null
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchProfile;
