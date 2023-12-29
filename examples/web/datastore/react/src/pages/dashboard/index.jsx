import { useUser } from "../../context/user";
import TodoList from "./todo";

export default function DashboardPage() {
  const { getUserDetails } = useUser();
  const userDetails = getUserDetails();
  
  const logoutUser = async () => {
    try {
      await window.catalyst.auth.signOut("/");
      // window.location.href = '/__catalyst/auth/login';
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center mb-4">
        <h2 className="px-8 text-md">
          Welcome {" "}
          <b>
            {userDetails?.first_name} {userDetails?.last_name}
          </b>{" "}
          !
        </h2>
        <button className="underline" onClick={logoutUser}>logout here</button>
      </div>
      <TodoList />
    </>
  );
}
