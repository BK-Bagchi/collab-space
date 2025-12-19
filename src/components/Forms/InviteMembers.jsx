import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Users } from "lucide-react";
import { ProjectAPI, UserAPI } from "../../api";
import Waiting from "../Loading/Waiting";

const InviteMembers = ({ project, setInviteModal, setSelectedProject }) => {
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(project.members);
  const [submitting, setSubmitting] = useState(false);

  const [invitingError, setInvitingError] = useState({
    status: false,
    message: "",
  });
  let debounceTimer;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await UserAPI.getAllUsers();
        setFetchedMembers(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);
  // console.log(fetchedMembers);
  // console.log(selectedMembers);

  const handleMembersChange = (e) => {
    const email = e.target.value;
    if (email === "") {
      setSearchedMembers([]);
      clearTimeout(debounceTimer);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const foundMember = fetchedMembers.find((member) =>
        member.email.toLowerCase().includes(email.toLowerCase())
      );
      // check if this member is not already selected
      if (foundMember) {
        const alreadySelected = searchedMembers.some(
          (member) => member.email === foundMember.email
        );
        if (!alreadySelected)
          setSearchedMembers((prev) => [...prev, foundMember]);
      }
    }, 500);
  };
  // console.log(searchedMembers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      members: selectedMembers.map((member) => member._id),
    };
    // console.log(payload);
    try {
      setSubmitting(true);
      // send invite to selected members
      const res = await ProjectAPI.inviteMember(project._id, payload);
      toast.success(res.data.message);
      setInviteModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error inviting members:", error.response);
      setInvitingError({
        status: true,
        message: error.response.data.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-darkSlate rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-vibrantPurple mb-6 heading-font">
        Invite Members to "{project.title}"
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Members */}
        <div className="text-charcoalGray">
          <label className="block dark:text-softWhite font-medium mb-1">
            Members (search by email) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="members"
              placeholder="e.g. dipto@example.com, bk@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-softWhite dark:bg-darkSlate dark:text-softWhite focus:ring-2 focus:ring-electricBlue outline-none"
              onChange={handleMembersChange}
            />
            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Selected Avatars */}
          {selectedMembers &&
            selectedMembers.map((member) => {
              const { _id, name } = member;
              return (
                <p key={_id} className="badge bg-electricBlue border-none m-1">
                  {name}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedMembers(
                        selectedMembers.filter((m) => m.email !== member.email)
                      )
                    }
                  >
                    &times;
                  </span>
                </p>
              );
            })}

          {/* Dynamic Avatars */}
          <div className="flex flex-wrap gap-4 mt-3">
            {searchedMembers &&
              searchedMembers.map((member) => {
                const { _id, name, email, avatar } = member;
                const initials = email.charAt(0).toUpperCase();
                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center text-center"
                    onClick={() =>
                      setSelectedMembers((prev) => [...prev, member])
                    }
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full cursor-pointer shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full cursor-pointer bg-electricBlue text-softWhite flex items-center justify-center text-lg font-semibold shadow-sm">
                        {initials}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-1 truncate max-w-20">
                      {name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="reset"
            className="px-4 py-2 border border-gray-300 text-charcoalGray dark:text-softWhite rounded-lg hover:bg-gray-100 dark:hover:text-charcoalGray transition"
            onClick={() => setInviteModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-vibrantPurple text-softWhite rounded-lg hover:bg-[#751C8E] transition"
          >
            {submitting ? (
              <p className="flex gap-2">
                <Waiting color="white" /> Inviting...
              </p>
            ) : (
              "Invite Members"
            )}
          </button>
          {/* Error while inviting members */}
          {invitingError.status && (
            <p className="text-red-500 text-sm mt-1">{invitingError.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default InviteMembers;
