import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";


function Slider() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src="images/main_img_1.webp" className="d-block slider-img" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="images/main_img_2.webp" className="d-block slider-img" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="images/main_img_3.webp" className="d-block slider-img" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    // <Carousel data-bs-theme="dark" className="slider-main mb-3">
    //   {sliderData && sliderData.map((slider) => (
    //     <Carousel.Item key={slider.slider_title}>
    //       <img
    //         className="d-block sliderImg"
    //         src={slider.slider_image}
    //         alt={slider.slider_title}
    //       />
    //       <Carousel.Caption>
    //         <h3 className="mb-4">{slider.slider_title}</h3>
    //         <span className="slider-button">
    //           <Link to={slider.slider_url}>КАТАЛОГ</Link>
    //         </span>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  );
}

export default Slider;
