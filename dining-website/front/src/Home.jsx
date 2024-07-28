import React, { useState } from "react";
import "./Home.css";
import gatheringDesktop from "./images/homepage/family-gathering-desktop.jpg";
import gatheringTablet from "./images/homepage/family-gathering-tablet.jpg";
import gatheringMobile from "./images/homepage/family-gathering-mobile.jpg";
import specialDesktop from "./images/homepage/special-events-desktop.jpg";
import specialTablet from "./images/homepage/special-events-tablet.jpg";
import specialMobile from "./images/homepage/special-events-mobile.jpg";
import socialDesktop from "./images/homepage/social-events-desktop.jpg";
import socialTablet from "./images/homepage/social-events-tablet.jpg";
import socialMobile from "./images/homepage/social-events-mobile.jpg";
import { FaChevronLeft,  FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [slide, setSlide] = useState(0);

  const reservationDetails = [
    {
      title: "Family Gatherings",
      summary:
        "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.",
      desktop: gatheringDesktop,
      tablet: gatheringTablet,
      mobile: gatheringMobile,
      id: 0,
    },
    {
      title: "Special Events",
      summary:
        "Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.",
      desktop: specialDesktop,
      tablet: specialTablet,
      mobile: specialMobile,
      id: 1,
    },
    {
      title: "Social Events",
      summary:
        "Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.",
      desktop: socialDesktop,
      tablet: socialTablet,
      mobile: socialMobile,
      id: 2,
    },
  ];

  function backward() {
    setSlide((prev) => prev - 1);
  }

  function forward() {
    setSlide((prev) => prev + 1);
  }

  return (
    <div>
      <header className="hero">
        <div className="text_container">
          <h1 className="hero_text title">dine</h1>
          <p className="hero_text paragraph">Exquisite dining since 1989</p>
          <small className="hero_text summary">
            Experience our seasonal menu in beautiful country surroundings. Eat
            the freshest produce from the comfort of our farmhouse.
          </small>
          <div className="button_container">
            <label htmlFor="">BOOK A TABLE</label>
          </div>
        </div>
      </header>
      <section className="info">
        <div className="info_flex_container">
          <div className="info_image"></div>
          <div className="section_text_container">
            <h1 className="section_title_text">
              Enjoyable place for the whole family
            </h1>
            <p className="section_para_text">
              Our relaxed surroundings make dining with us a great experience
              for everyone. We can even arrange a tour of the farm before your
              meal.
            </p>
          </div>
        </div>
        <div className="info_flex_container reverse">
          <div className="food_info_image"></div>
          <div className="section_text_container">
            <h1 className="section_title_text">
              The most locally sourced food
            </h1>
            <p className="section_para_text">
              All of our ingredients come directly from our farm or local
              fishery. So you can be sure that you’re eating the freshest, most
              sustainable food.
            </p>
          </div>
        </div>
      </section>
      <section className="highlights">
        <div className="inner_container">
          <div className="divider"></div>
          <h1 className="highlights-title">A few highlights from our menu</h1>
          <p className="highlights-summary">
            We cater for all dietary requirements, but here’s a glimpse at some
            of our diner’s favorites. Our menu is revamped every season.
          </p>
        </div>
        <div className="feature-flex">
          <div className="feature_container">
            <div alt="salmon plate" className="feature_img salmon" />
            <div className="feature_text">
              <h2 className="padding heading">Seared Salmon Fillet</h2>
              <p className="padding summary">
                Our locally sourced salmon served with a refreshing buckwheat
                summer salad.
              </p>
            </div>
          </div>
          <div className="feature_container">
            <div alt="beef plate" className="feature_img beef" />
            <div className="feature_text">
              <h2 className="padding heading">Rosemary Filet Mignon</h2>
              <p className="padding summary">
                Our prime beef served to your taste with a delicious choice of
                seasonal sides.
              </p>
            </div>
          </div>
          <div className="feature_container">
            <div alt="mouse dessert" className="feature_img mousse" />
            <div className="feature_text">
              <h2 className="padding heading">Summer Fruit Chocolate Mousse</h2>
              <p className="padding summary">
                Creamy mousse combined with summer fruits and dark chocolate
                shavings.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="reservations">
        <button
          style={
            slide === 0
              ? { opacity: 0 }
              : {
                  opacity: 1,
                  fontSize: 25,
                  background: "none",
                  border: "none",
                  padding: 20,
                }
          }
          disabled={slide === 0 ? true : false}
          onClick={backward}
        >
          <FaChevronLeft />
        </button>
        <div className="block">
          {reservationDetails
            .filter((res) => res.id === slide)
            .map((res) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className="block">
                  <img
                    alt={res.title}
                    src={res.desktop}
                    className="reservation_img desktop"
                    style={{ margin: "0px auto", alignContent: "center" }}
                  />
                  <img
                    alt={res.title}
                    src={res.tablet}
                    className="reservation_img tablet"
                    style={{ margin: "0px auto", alignContent: "center" }}
                  />

                  <img
                    alt={res.title}
                    src={res.mobile}
                    className="reservation_img mobile"
                    style={{ margin: "0px auto", alignContent: "center" }}
                  />
                  <div className="reservation_text_container">
                    <div className="reservation_box">
                      <h1
                        style={{ margin: "36px 0px" }}
                        className="highlights-title"
                      >
                        {res.title}
                      </h1>
                      <p className="res-text">{res.summary}</p>
                      <div className="button_container button">
                        <label htmlFor="">BOOK A TABLE</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          disabled={slide === 2 ? true : false}
          style={
            slide === 2
              ? { opacity: 0 }
              : {
                  opacity: 1,
                  fontSize: 25,
                  background: "none",
                  border: "none",
                  padding: 20,
                }
          }
          onClick={forward}
        >
          <FaChevronRight />
        </button>
        {/* <div className="reservation_img"></div>
        <div className="reservation_text_container">
            <ul>
                <li>Family Gatherings</li>
                <li>Special Events</li>
                <li>Social Events</li>
            </ul>
            <div className="reservation_box">
                <h1 style={{margin: "36px 0px"}} className="highlights-title">Family Gathering</h1>
                <p className="res-text">We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.</p>
                <div className="button_container button">
            <label htmlFor="">BOOK A TABLE</label>
          </div>
            </div>
        </div> */}
      </section>
      <footer>
        <h1 style={{ margin: "36px 0px" }} className="highlights-title">
          Ready to make a reservation?
        </h1>
        <div className="button_container">
          <label htmlFor="">BOOK A TABLE</label>
        </div>
      </footer>
    </div>
  );
}
