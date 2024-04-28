import { Footer } from "flowbite-react";
import { BsLinkedin, BsFacebook, BsTwitter, BsGoogle } from "react-icons/bs";
import SocialMedia from "../constants/SocialMedia";

const FooterCom = () => {
  return (
    <Footer>
      <div className='w-full z-10 bg-gray-50 px-5 py-3 dark:bg-gray-800'>
        <div className='w-full px-4 py-6 sm:flex sm:items-center sm:justify-between'>
          <p>
            <a>Copyright © Urban Purple 2008-{new Date().getFullYear()}</a>
          </p>
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon
              target={"_blank"}
              href={SocialMedia.fb}
              icon={BsFacebook}
            />
            <Footer.Icon
              target={"_blank"}
              href={SocialMedia.twitter}
              icon={BsTwitter}
            />
            <Footer.Icon
              target={"_blank"}
              href={SocialMedia.google}
              icon={BsGoogle}
            />
            <Footer.Icon
              target={"_blank"}
              href={SocialMedia.linkedIn}
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
