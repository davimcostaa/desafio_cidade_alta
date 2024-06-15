import Image from 'next/image';
import buttonDecoration from "../../../public/images/button-decoration.svg";

const Header = () => {
  return (
    <div className="p-5">
        <Image src='/images/logo.png' width={140} height={140} alt='Logo' /> 
    </div>
  )
}

export default Header