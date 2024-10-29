import { useLocation, useNavigate } from 'react-router-dom'
import { views } from '../../constants/reactConstants'


const HashRedirect = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const config = { replace: true }
  const hashed = Object.values(views).find(data => `#/${data.url}` === location.hash)
  if (hashed) navigate(hashed.url, config)
  else navigate(views.text.url, config)
}

export default HashRedirect