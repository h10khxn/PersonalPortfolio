import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

const technologies = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" },
  { name: "Azure SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" },
];

const TechWheel: React.FC = () => {
  const swiperRef = useRef<SwiperType>();
  let autoplayTimeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(autoplayTimeoutId);
    autoplayTimeoutId = setTimeout(() => {
      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }, 100);
  };

  return (
    <div className="bg-black">
      <section className="py-10 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          

          <div className="relative max-w-7xl mx-auto">
            {/* Left and right gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden px-0">
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={40}
                slidesPerView={4}
                loop={true}
                speed={1500}
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumRatio: 0.25,
                }}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
                className="tech-swiper"
              >
                {technologies.map((tech, index) => (
                  <SwiperSlide key={`${tech.name}-${index}`}>
                    <div
                      className="flex flex-col items-center gap-4 py-6 px-4 transition-all duration-300 hover:scale-110"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="w-24 h-24 md:w-32 md:h-32 object-contain filter drop-shadow-lg"
                        loading="lazy"
                        draggable="false"
                      />
                      <span className="text-xs md:text-sm font-medium text-gray-300 tracking-wide">
                        {tech.name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechWheel;
