import _ from 'lodash'
import { Link } from 'react-router-dom'


const SiteHeader = ({ defaultPath, onClick = _.noop, ...props }) =>
  <h1>
    <Link to={`/${defaultPath}`} onClick={onClick} {...props}>
      On the Impulse to Notate
    </Link>
  </h1>

export default SiteHeader