import React, { useEffect } from 'react';

//Bit.dev import -> Ts wont complie unless ignored any type
// @ts-ignore
import Slider from '@bit/akiran.react-slick.slider'


export function BitSlider ({...props}) {

	function NextArrow({...props}) {
		const {  style, onClick, nextArrow } = props;

		return (
			<div onClick={onClick} >
				{props.nextArrow}
			</div>
		);
	}

	function PrevArrow({...props}) {
		const {  style, onClick, prevArrow } = props;

		return (
			<div onClick={onClick} >
				{props.prevArrow}
			</div>
		);
	}

	const settings = {
		dots: props.dots,
		infinite: props.infinite,
		slidesToShow: props.slidesToShow,
		slidesToScroll: props.slidesToScroll,
		nextArrow: <NextArrow {...props} />,
		prevArrow: <PrevArrow {...props} />,
	};

	return (
		<div className={props.className}>
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
			<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
			<Slider {...props} {...settings} >

				{props.children}
			</Slider>
		</div>
	);
}

const cssstyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 40px 40px;
  width: 400px;
}
h3 {
    background: #5f9ea0;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
`