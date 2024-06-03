import React from "react";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="  reviews_main_page_div" id="Reviews">
      <div className="reviews_main_upper_div">
        <h2>{t("Reviews.heading")}</h2>
        <small>{t("Reviews.subheading")}</small>
      </div>
      <div className="reviews_main_lower_div col-md-12">
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img
                src="https://themewagon.github.io/known/images/tst-image3.jpg"
                alt=""
              />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>Barbie</h4>
              <span>Art Director</span>
            </div>
          </div>
          <p>
            Nam eget mi eu ante faucibus viverra nec sed magna. Vivamus viverra
            sapien ex, elementum varius ex sagittis vel.
          </p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img
                src="https://themewagon.github.io/known/images/tst-image3.jpg"
                alt=""
              />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>Barbie</h4>
              <span>Art Director</span>
            </div>
          </div>
          <p>
            Nam eget mi eu ante faucibus viverra nec sed magna. Vivamus viverra
            sapien ex, elementum varius ex sagittis vel.
          </p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
        <div className=" reviews_main_lower_box">
          <div className="reviews_main_lower_box_header">
            <div className="reviews_main_lower_box_header_circle">
              <img
                src="https://themewagon.github.io/known/images/tst-image3.jpg"
                alt=""
              />
            </div>
            <div className="reviews_main_lower_box_header_heading">
              <h4>Barbie</h4>
              <span>Art Director</span>
            </div>
          </div>
          <p>
            Nam eget mi eu ante faucibus viverra nec sed magna. Vivamus viverra
            sapien ex, elementum varius ex sagittis vel.
          </p>
          <div className="reviews_main_lower_box_footer">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
