import Image from 'next/image';

const Header = () => {
  return (
    <div className="p-5">
        <Image src='/images/logo.png' width={240} height={240} alt='Logo' /> 
    </div>
  )
}

export default Header