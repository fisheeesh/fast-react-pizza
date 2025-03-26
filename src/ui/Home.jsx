import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser'
import Button from './Button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import pizza from '../assets/pizza.lottie'

function Home() {
  const { username } = useSelector(store => store.user)
  return (
    <div className=' text-center px-4 flex flex-col justify-center items-center'>
      <DotLottieReact
        src={pizza}
        loop
        autoplay
        style={{ width: '400px', height: '230px' }}
      />
      <h1 className='mb-8 text-xl font-semibold md:text-2xl'>
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === '' ? <CreateUser /> : <Button to={'/menu'} type={'primary'}>Continue Ordering, {username}</Button>}
    </div>
  );
}

export default Home;
