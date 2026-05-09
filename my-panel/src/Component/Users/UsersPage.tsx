import UserHeader from "./UserHeader";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-y-6">
        <UserHeader />
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
