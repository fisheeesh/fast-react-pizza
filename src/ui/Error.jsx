import LinkButton from './LinkButton';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import dinosaur from '../assets/dinosaur.lottie'

function NotFound() {

  return (
    <div className='min-h-screen flex items-center text-sm px-8 md:text-base justify-center text-center flex-col bg-white'>
      <DotLottieReact
        src={dinosaur}
        loop
        autoplay
        style={{ width: '700px', height: '400px' }}
      />
      <h1 className='mb-3 max-w-2xl mx-auto'>You’re seeing this page because the page you’re looking for doesn’t exist, or you tried to search for an order using an Order ID that starts with a ‘#’ symbol. Try searching without ‘#’.</h1>
      <LinkButton to={'/'}>
        &larr; Go Back
      </LinkButton>
    </div>
  );
}

export default NotFound;



