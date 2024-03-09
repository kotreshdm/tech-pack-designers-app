import { Footer } from "flowbite-react";
import { BsLinkedin, BsFacebook, BsTwitter, BsGoogle } from "react-icons/bs";
import SocialMedia from "../constants/SocialMedia";

const FooterCom = () => {
  return (
    <Footer>
      <div className='w-full z-10 bg-gray-50 px-5 py-3 dark:bg-gray-800'>
        {/* <div className='grid w-full grid-cols-2 gap-8 px-4 py-3 md:grid-cols-4'>
          <div>
            <Footer.Title title='Company' />
            <Footer.LinkGroup col>
              <Footer.Link href={SocialMedia.fb}>About</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Careers</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Brand Center</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='help center' />
            <Footer.LinkGroup col>
              <Footer.Link href={SocialMedia.fb}>Discord Server</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Twitter</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Facebook</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='legal' />
            <Footer.LinkGroup col>
              <Footer.Link href={SocialMedia.fb}>Privacy Policy</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Licensing</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title='download' />
            <Footer.LinkGroup col>
              <Footer.Link href={SocialMedia.fb}>iOS</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Android</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>Windows</Footer.Link>
              <Footer.Link href={SocialMedia.fb}>MacOS</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div> */}
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
