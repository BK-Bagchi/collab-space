import React, { useEffect, useState } from "react";
import { User, Mail, Briefcase, MessageSquare, UserPlus } from "lucide-react";
import { UserAPI } from "../../api";
import formatText from "../../utils/textFormater";
import Avatar from "../../assets/Default_Avatar.jpg";
import NewChatBox from "../../components/Chat/NewChatBox";
import { useAuth } from "../../hooks/useAuth";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null); // user who we chat with
  const { user: sender } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserAPI.getAllUsers();
        setUsers(res.data.filter((u) => u._id !== sender._id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [sender._id]);

  return (
    <div className="p-6 bg-softWhite min-h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-charcoalGray flex items-center gap-2">
          <User className="text-electricBlue" />
          All Registered Users
        </h2>
        <span className="text-sm text-gray-500">
          Total Users: {users.length}
        </span>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.length ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-100 relative"
            >
              {/* Avatar & Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.avatar || Avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#2979FF] shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold text-charcoalGray">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Briefcase size={14} className="text-tealGreen" />
                <span className="capitalize">{formatText(user.role)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-electricBlue text-white text-sm py-2 rounded-lg hover:bg-[#1E63D1] transition">
                  <UserPlus size={14} /> Follow
                </button>
                <button
                  onClick={() => setActiveChatUser(user)}
                  className="flex-1 flex items-center justify-center gap-2 border border-vibrantPurple text-vibrantPurple text-sm py-2 rounded-lg hover:bg-vibrantPurple hover:text-white transition"
                >
                  <MessageSquare size={14} /> Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-20">
            <User size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">No users found</p>
          </div>
        )}
      </div>

      {/* ChatBox popup */}
      {activeChatUser && (
        <NewChatBox
          activeChatUser={activeChatUser}
          setActiveChatUser={setActiveChatUser}
        />
      )}
    </div>
  );
};

export default UserList;
