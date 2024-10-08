import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LessonDetail } from "./ListComponent";

interface LessonDetailSliderProps {
  lessonDetail?: LessonDetail;
}

const LessonDetailSlider: React.FC<LessonDetailSliderProps> = ({
  lessonDetail,
}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow  flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition duration-300">
          <ArrowRight color="black" />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="next-slick-arrow flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition duration-300">
          <ArrowLeft color="black" />
        </div>
      </div>
    ),
  };

  return (
    <div className="max-w-[750px] mx-auto">
      <div className="slider-container">
        <Slider {...settings}>
          {lessonDetail?.questions?.map((question, questionIndex) => (
            <div key={questionIndex} className="p-10">
              <h3>Question Name : {question.text}</h3>
              <p>Answer: {question.answer}</p>
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                {question.options?.map((option, index) => (
                  <div
                    key={option.id}
                    className="bg-gray-100 rounded-lg shadow-sm cursor-pointer w-full"
                  >
                    <p className="text-lg font-medium mb-2">
                      {`Option ${index + 1} : `}
                      {option.text}
                    </p>
                    {option.audio && (
                      <audio controls className="w-full rounded-full">
                        <source src={option.audio.urlKey} type="audio/mpeg" />
                      </audio>
                    )}
                    {option.image && (
                      <div className="mb-2">
                        <img
                          src={option.image.urlKey}
                          alt={option.image.description}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                ))} 
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LessonDetailSlider;
