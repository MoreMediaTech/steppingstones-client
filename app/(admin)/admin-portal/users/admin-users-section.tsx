// component
import Loader from "@components/Loader";
import AdminUsersTable from "./admin-users-table";

// zod schemas
import { UserSchemaWithIdType } from "@models/User";

// hooks (Controller)
import useUsersController from "./use-users-controller";

export function AdminUsersSection() {
  const { users, isLoading } = useUsersController();

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className="h-12 w-12" />
      </div>
    );
  }
  return (
    <section>
      <AdminUsersTable users={users as UserSchemaWithIdType[]} />
    </section>
  );
}
