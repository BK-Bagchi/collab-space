import { useEffect, useState } from "react";
import { ProjectAPI, UserAPI } from "../../api";

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
      await Promise.all(
        selectedMembers.map((member) =>
          ProjectAPI.inviteMember(project._id, { id: member._id })
        )
      );
      // update project with new members
      await ProjectAPI.updateProject(project._id, payload);

      alert("Members invited successfully!");
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
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-vibrantPurple mb-6 heading-font">
        Invite Members to "{project.title}"
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Members */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Members (emails, comma separated)
          </label>
          <input
            type="text"
            name="members"
            placeholder="e.g. dipto@example.com, bk@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
            onChange={handleMembersChange}
          />
          {/* 👤 Selected Avatars */}
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
          {/* 👤 Dynamic Avatars */}
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
                      //include this member in list
                      setSelectedMembers((prev) => [...prev, member])
                    }
                  >
                    {
                      // Avatar
                      avatar ? (
                        <img
                          src={avatar}
                          alt={name}
                          className="w-12 h-12 rounded-full cursor-pointer shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full cursor-pointer bg-electricBlue text-softWhite flex items-center justify-center text-lg font-semibold shadow-sm">
                          {initials}
                        </div>
                      )
                    }
                    <p className="text-xs text-gray-600 mt-1 truncate max-w-[80px]">
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
            className="px-4 py-2 border border-gray-300 text-charcoalGray rounded-lg hover:bg-gray-100 transition"
            onClick={() => setInviteModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-vibrantPurple text-softWhite rounded-lg hover:bg-[#751C8E] transition"
          >
            {submitting ? "Inviting..." : "Invite Members"}
          </button>
          {/* Error while updating project */}
          {invitingError.status && (
            <p className="text-red-500 text-sm mt-1">{invitingError.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default InviteMembers;
