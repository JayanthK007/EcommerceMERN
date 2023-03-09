import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import Facebook from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/jayanth_k99";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dtwmffha8/image/upload/v1678362066/avatars/IMG_20220730_155130_vmrvaq.jpg"
              alt="Founder"
            />
            <Typography>JayanthKumar K</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @JayanthKumar. Only with the
              purpose to teach MERN Stack 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/jayanth.appu13"
              target="blank"
            >
              <Facebook className="facebookSvgIcon" />
            </a>

            <a href="https://www.instagram.com/jayanth_k99" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;