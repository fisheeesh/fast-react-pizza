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
      <h1 className='mb-3'>The page you are looking for doesn&apos;t exist. Please return to the homepage.</h1>
      <LinkButton to={'/'}>
        &larr; Go Back
      </LinkButton>
    </div>
  );
}

export default NotFound;



