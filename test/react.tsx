import { FC } from "react";

type User = {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
};

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
};

const MAGIC_NUMBER: number = 42;
const API_URL: string = "https://api.acme.com/users";

export const UserList: FC<Props> = ({ users, onUserSelect }): JSX.Element => {
  const [selectedUsers, setSelectedUsers] = React.useState<Set<string>>(
    new Set(),
  );

  const handleUserClick = (user: User): void => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      next.has(user.id) ? next.delete(user.id) : next.add(user.id);
      return next;
    });
    onUserSelect(user);
  };

  const activeUsers = React.useMemo(
    (): User[] => users.filter((user: User): boolean => user.isActive),
    [users],
  );

  return (
    <div className="user-container">
      {activeUsers.map(
        (user: User): JSX.Element => (
          <button
            key={user.id}
            onClick={(): void => handleUserClick(user)}
            className={`user-item ${selectedUsers.has(user.id) ? "selected" : ""}`}
          >
            <span>{`${user.name} (${user.age})`}</span>
            {user.isActive && <span className="active-badge">●</span>}
          </button>
        ),
      )}
    </div>
  );
};

const TEST_USERS: User[] = [
  { id: "1", name: "John Doe", age: MAGIC_NUMBER, isActive: true },
  { id: "2", name: "Jane Smith", age: 38, isActive: false },
];

const regex = /^[A-Z][a-z]+$/;
const multilineString = `
  This is a multiline
  string to test syntax
  highlighting
`;
