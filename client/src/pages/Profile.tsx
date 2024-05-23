import { Button, Image } from "antd";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileData, updateProfileImage } from "../api/user";
import { IUser } from "../interfaces/IUser";
import Uploader from "../components/Uploader";
import { showErrorMessage, showSuccessMessage } from "../helpers/helpers";
function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<IUser>>({});
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    (async function getData() {
      const res = await getProfileData();

      setUser(res?.data.user);
    })();
  }, []);

  useEffect(() => {
    if (!avatarUrl) return;

    (async function updateAvatar() {
      try {
        const res = await updateProfileImage(avatarUrl);
        showSuccessMessage(res);
      } catch (err) {
        showErrorMessage(err);
      }
    })();
  }, [avatarUrl]);

  return (
    <>
      <div className="main--container">
        <div className="heading--container">
          <h2 className="content--heading">My profile</h2>
        </div>

        <div className="profile--container">
          <div className="profile--left--container">
            <div className="personal--info">
              <div className="profile--info--top--container">
                <div className="avatar--img--wrap">
                
                  <Image
                    className="avatar--img"
                    src={avatarUrl?avatarUrl:user?.avatarUrl}
                  />
                  
                  <Uploader showLabel={false} setAvatarUrl={setAvatarUrl} />
                    
                </div>
                <div className="username--wrap">
                  <h1 className="username">{user ? user.name : null}</h1>
                  <span className="secondary--text">
                    @{user?.username?.toLowerCase()}
                  </span>
                  <Button
                    type="link"
                    className="edit--btn"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="profile--info--bottom--container">
                <h3 className="content--heading">Personal Information</h3>

                <div className="profile--info--bottom--container--child">
                  <div>
                    <label className="secondary--text">Full Name</label>
                    <h4>{user?.name}</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  <div>
                    <label className="secondary--text">Email</label>
                    <h4>{user?.email}</h4>
                  </div>
                  <div>
                    <label className="secondary--text">Contact Number</label>
                    <h4>{user?.contactNumber}</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  <div>
                    <label className="secondary--text">Bio</label>
                    <h4>{user?.bio ? user.bio : "Bio is not set yet"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile--right--container">
            <div className="address--container">
              <div className="profile--info--bottom--container">
                <h3 className="content--heading">Address</h3>

                <div className="profile--info--bottom--container--child">
                  <div>
                    <label className="secondary--text">Country</label>
                    <h4>
                      {user?.address?.country ? user.address.country : "-"}
                    </h4>
                  </div>
                  <div>
                    <label className="secondary--text">State</label>
                    <h4>{user?.address?.state ? user.address.state : "-"}</h4>
                  </div>
                </div>
                <div className="profile--info--bottom--container--child">
                  <div>
                    <label className="secondary--text">Postal Code</label>
                    <h4>
                      {user?.address?.postalCode
                        ? user.address.postalCode
                        : "-"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
