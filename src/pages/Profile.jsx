import { people01 } from "../assets"
import { Header } from "../components"


const Profile = () => {
  return (
    <div className="flex h-screen">
      <div>
        <Header />
      </div>
      <div className="h-screen flex-1 p-10">
        <h1 className="text-2xl font-semibold ">My Profile</h1>
        <div className="flex gap-5 py-10">
          <div className="border border-blue-400 p-10">
            <img src={people01} alt="" />
          </div>

          <div className="border border-blue-400 p-10">
            <h1>Name: Admin</h1>
            <h1>Email: admin@sale-ai.com</h1>
            <h1>Phone Number: 080******258</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
