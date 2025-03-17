/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
  const menu = useLoaderData()

  console.log(menu)

  return <ul>
    {
      menu.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))
    }
  </ul>
}

export const loader = async () => {
  const menu = getMenu()
  return menu
}

export default Menu;
