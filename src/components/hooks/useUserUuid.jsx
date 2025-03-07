import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { generateUUID } from "../../utils/uuid";

const useUserUuid = () => {
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    // Check for existing UUID in cookies
    let userUuid = Cookies.get("user_uuid");

    if (!userUuid) {
      // Generate a new UUID if none exists
      userUuid = generateUUID();
      // Set it in cookies immediately (no consent required per your request)
      Cookies.set("user_uuid", userUuid, { expires: 365 });
    }

    // Set the UUID in state
    setUuid(userUuid);
  }, []);

  // Optional: Keep handleAccept for future use, but it’s not needed now
  const handleAccept = () => {
    // Already set in cookies, so this could be a no-op or removed
    if (uuid) {
      Cookies.set("user_uuid", uuid, { expires: 365 });
      Cookies.set("cookie_consent", "accepted", { expires: 365 });
    }
  };

  return [uuid, handleAccept];
};

export default useUserUuid;
