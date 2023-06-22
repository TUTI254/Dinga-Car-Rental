import Link from "next/link"
import Image from "next/image"
import CustomButton from "./CustomButton"

const Navbar =()=> {
  return (
    <>
    <header className="w-full absolute z-10">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
            <Link href="/"className="flex justify-center items-center">
                {/* <Image src="/model-icon.png" alt="Dinga-logo" width={18} height={18} /> */}
                <h1 className="text-2xl font-bold ">Dinga Car Rental</h1>
            </Link>

            <CustomButton
                title="Sign In"
                btnType="button"
                containerStyles="text-primary-blue bg-white rounded-full min-w-[130px] shadow-md"
            />
        </nav>
    </header>
    </>
  )
}

export default Navbar