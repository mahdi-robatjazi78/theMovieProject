import React, { useState } from "react";
import { Button, Space, Image, Row, Col, Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import useMovieApi from "../../hooks/useMovieApi";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Navigation,Autoplay } from "swiper/core";
import "./TrendsStyle.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";

import { Link } from "react-router-dom";

SwiperCore.use([Navigation]);

const Persons = () => {
  const {
    data: persons = {},
    reFetch: refetchPersons,
    loading: PersonsLoading,
  } = useMovieApi(`trending/person/day`);
  console.log(persons);
  
  const dayButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/day`);
  };
  
  const weekButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/week`);
  };

  const [personDetail, setPersonDetail] = useState({});
  const showDetailPerson = (person) => {
    setPersonDetail(person);
    window.scrollTo({ top: 1200, behavior: "smooth" });
  };

  SwiperCore.use([Pagination, Navigation,Autoplay]);
  
  return (
    <div>
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">persons</h1>
        <Button type="dashed" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false
        }} 
        breakpoints={{
          "640": {
            "slidesPerView": 2,
            "spaceBetween": 20
          },
          "768": {
            "slidesPerView": 3,
            "spaceBetween": 40
          },
          "1024": {
            "slidesPerView": 4,
            "spaceBetween": 50
          }
        }}
      >
        {PersonsLoading ? (
          <div className="spinContainer">
            <Spin />
          </div>
        ) : (
          persons.results.map((p) => (
            <SwiperSlide key={p.id} onClick={() => showDetailPerson(p)}>
              <div className="swiper-card-flex">
                <Image
                  preview={false}
                  height="250px"
                  src={
                    p.profile_path === null
                      ? "/userIcon.png"
                      : `https://image.tmdb.org/t/p/w500${p.profile_path}`
                  }
                  alt={p.original_title}
                />
                <Space>
                  <p>{p.name} ------</p>
                  <p>{p.known_for_department}</p>
                </Space>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      {personDetail.name && (
        <Row>
          <Col span={12} className="personInfoBox">
            <div className="infoBox">
              <h1>
                <span>name</span>: {personDetail.name}
              </h1>
              <h1>
                <span>known for department</span>:{" "}
                {personDetail.known_for_department}
              </h1>
              <h1>
                <span>gender </span>:{" "}
                {personDetail.gender === 1 ? "female" : "male"}
              </h1>
              <Button type="danger">
                <Link to={`/celebrity/${personDetail.id}`}>
                  get more detail
                </Link>
              </Button>
            </div>
          </Col>
          <Col span={12} style={{ marginTop: "40px" }}>
            <Swiper navigation={true} className="mySwiper">
              {personDetail?.known_for?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div style={{ textAlign: "center" }}>
                    <h1 className="imageDesc">known with </h1>
                    <Image
                      height="600px"
                      preview={false}
                      alt={item.original_title}
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Persons;
