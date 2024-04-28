import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PocketShareButton,
  RedditShareButton,
  TwitterShareButton,
  TumblrShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  GabShareButton,
  HatenaShareButton,
  LineShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  ViberShareButton,
  VKShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  PocketIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  LineIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";

const SharePost = ({ url, quote, hashtag, className }) => {
  return (
    <div className={`${className} share-icons`}>
      <span className='share-item'>
        <RedditShareButton url={url} quote={quote} hashtag={hashtag}>
          <RedditIcon size={24} round text='Facebook' />
          <span className='icon-details'>Redditt</span>
        </RedditShareButton>
      </span>
      <span className='share-item'>
        <TwitterShareButton url={url} quote={quote} hashtags={[...hashtag]}>
          <TwitterIcon size={24} round />{" "}
          <span className='icon-details'>Twitter</span>
        </TwitterShareButton>
      </span>
      <span className='share-item'>
        <FacebookShareButton url={url} quote={quote} hashtag={hashtag}>
          <FacebookIcon size={24} round />
          <span className='icon-details'>Facebook</span>
        </FacebookShareButton>
      </span>
      <span className='share-item'>
        <LinkedinShareButton url={url} quote={quote} hashtag={hashtag}>
          <LinkedinIcon size={24} round />
          <span className='icon-details'>LinekdIn</span>
        </LinkedinShareButton>
      </span>
      <span className='share-item'>
        <TumblrShareButton url={url} quote={quote} hashtag={hashtag}>
          <TumblrIcon size={24} round />
          <span className='icon-details'>Tumblr</span>
        </TumblrShareButton>
      </span>
      <span className='share-item'>
        <WhatsappShareButton url={url} quote={quote} hashtag={hashtag}>
          <WhatsappIcon size={24} round />
          <span className='icon-details'>Whatsapp</span>
        </WhatsappShareButton>
      </span>
      <span className='share-item'>
        <EmailShareButton url={url} subject={quote}>
          <EmailIcon size={24} round />
          <span className='icon-details'>Email</span>
        </EmailShareButton>
      </span>
      <span className='share-item'>
        <PocketShareButton url={url} quote={quote} hashtag={hashtag}>
          <PocketIcon size={24} round />
          <span className='icon-details'>Pocket</span>
        </PocketShareButton>
      </span>
      <span className='share-item'>
        <InstapaperShareButton url={url} quote={quote} hashtag={hashtag}>
          <InstapaperIcon size={24} round />
          <span className='icon-details'>Instagram</span>
        </InstapaperShareButton>
      </span>

      <span className='share-item'>
        <TelegramShareButton url={url} quote={quote} hashtag={hashtag}>
          <TelegramIcon size={24} round />
          <span className='icon-details'>Telegram</span>
        </TelegramShareButton>
      </span>
    </div>
  );
};

export default SharePost;
